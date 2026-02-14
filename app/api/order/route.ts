import { NextRequest, NextResponse } from "next/server";

type OrderPayload = {
  product: string;
  price: string;
  contact: string;
  details?: string;
  orderId: string;
  // bot trap:
  website?: string;
};

function getIP(req: NextRequest) {
  // Vercel/proxies
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function now() {
  return Date.now();
}

// very simple in-memory rate limiter (good enough for small sites; resets on restart)
// key: `${ip}|${ua}`
declare global {
  // eslint-disable-next-line no-var
  var __AUREON_RL__: Map<string, { count: number; resetAt: number }> | undefined;
}

const RL = globalThis.__AUREON_RL__ ?? new Map<string, { count: number; resetAt: number }>();
globalThis.__AUREON_RL__ = RL;

function rateLimit(key: string, limit: number, windowMs: number) {
  const t = now();
  const entry = RL.get(key);

  if (!entry || t > entry.resetAt) {
    RL.set(key, { count: 1, resetAt: t + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) return { ok: false, remaining: 0 };
  entry.count += 1;
  RL.set(key, entry);
  return { ok: true, remaining: Math.max(0, limit - entry.count) };
}

function clip(s: string, n: number) {
  const v = (s || "").trim();
  return v.length > n ? v.slice(0, n) + "…" : v;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    // honeypot: bots fill hidden fields
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // pretend success to waste bot time
    }

    const ip = getIP(req);
    const ua = req.headers.get("user-agent") || "unknown";
    const key = `${ip}|${ua}`;

    // anti-spam: 10 requests per 10 minutes per IP/UA
    const rl = rateLimit(key, 10, 10 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Rate limited. Try again later." },
        { status: 429 }
      );
    }

    const product = (body.product || "").trim();
    const price = (body.price || "").trim();
    const contact = (body.contact || "").trim();
    const details = (body.details || "").trim();
    const orderId = (body.orderId || "").trim();

    // basic validation
    if (!orderId || !orderId.startsWith("AUR-") || orderId.length > 32) {
      return NextResponse.json({ ok: false, error: "Invalid Order ID." }, { status: 400 });
    }
    if (!product || product.length > 120) {
      return NextResponse.json({ ok: false, error: "Product required." }, { status: 400 });
    }
    if (!price || price.length > 40) {
      return NextResponse.json({ ok: false, error: "Price required." }, { status: 400 });
    }
    if (!contact || contact.length > 120) {
      return NextResponse.json({ ok: false, error: "Contact required." }, { status: 400 });
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 500 });
    }

    // nice embed
    const embed = {
      title: "🟡 New Order Created",
      color: 0xf5c542, // gold
      fields: [
        { name: "Order ID", value: `\`${clip(orderId, 40)}\``, inline: false },
        { name: "Product", value: clip(product, 200) || "—", inline: false },
        { name: "Price", value: clip(price, 80) || "—", inline: true },
        { name: "Contact", value: clip(contact, 120) || "—", inline: true },
        { name: "Details", value: clip(details || "—", 900), inline: false },
      ],
      footer: { text: "Aureon Collective • Verification required" },
      timestamp: new Date().toISOString(),
    };

    const content = null; // keep clean; embed only
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, embeds: [embed] }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "Failed to post to webhook.", detail: txt.slice(0, 200) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}