import { NextRequest, NextResponse } from "next/server";

type OrderPayload = {
  product: string;
  price: string;
  contact: string;
  details?: string;
  orderId: string;
  website?: string; // honeypot
};

function getIP(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function now() {
  return Date.now();
}

declare global {
  // eslint-disable-next-line no-var
  var __AUREON_RL__: Map<
    string,
    { count: number; resetAt: number; bannedUntil?: number }
  > | undefined;
}

const RL =
  globalThis.__AUREON_RL__ ??
  new Map<string, { count: number; resetAt: number; bannedUntil?: number }>();
globalThis.__AUREON_RL__ = RL;

function clip(s: string, n: number) {
  const v = (s || "").trim();
  return v.length > n ? v.slice(0, n) + "…" : v;
}

/**
 * Rate limit with "timeout" (temporary ban)
 * - limit = max requests in windowMs
 * - if exceeded => banMs
 */
function rateLimitWithBan(key: string, limit: number, windowMs: number, banMs: number) {
  const t = now();
  const entry = RL.get(key);

  // already banned?
  if (entry?.bannedUntil && t < entry.bannedUntil) {
    const retryAfterSeconds = Math.ceil((entry.bannedUntil - t) / 1000);
    return { ok: false as const, banned: true as const, retryAfterSeconds };
  }

  // new window
  if (!entry || t > entry.resetAt) {
    RL.set(key, { count: 1, resetAt: t + windowMs });
    return { ok: true as const, banned: false as const, remaining: limit - 1 };
  }

  // within window
  if (entry.count >= limit) {
    entry.bannedUntil = t + banMs;
    RL.set(key, entry);
    return { ok: false as const, banned: true as const, retryAfterSeconds: Math.ceil(banMs / 1000) };
  }

  entry.count += 1;
  RL.set(key, entry);
  return { ok: true as const, banned: false as const, remaining: Math.max(0, limit - entry.count) };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderPayload;

    // honeypot
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // waste bot time
    }

    const ip = getIP(req);
    const ua = req.headers.get("user-agent") || "unknown";
    const key = `${ip}|${ua}`;

    // ✅ SPAM RULES
    // 3 requests per 60s, then 10 minute timeout
    const rl = rateLimitWithBan(key, 3, 60_000, 10 * 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Timed out for spam. Try again later.",
          retryAfterSeconds: rl.retryAfterSeconds,
        },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }

    const product = (body.product || "").trim();
    const price = (body.price || "").trim();
    const contact = (body.contact || "").trim();
    const details = (body.details || "").trim();
    const orderId = (body.orderId || "").trim();

    // validation
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

    const embed = {
      title: "🟡 New Order Created",
      color: 0xf5c542,
      fields: [
        { name: "Order ID", value: `\`${clip(orderId, 40)}\``, inline: false },
        { name: "Product", value: clip(product, 200) || "—", inline: false },
        { name: "Price", value: clip(price, 80) || "—", inline: true },
        { name: "Contact", value: clip(contact, 120) || "—", inline: true },
        { name: "Details", value: clip(details || "—", 900), inline: false },
        { name: "IP", value: `\`${clip(ip, 64)}\``, inline: true },
      ],
      footer: { text: "Aureon Collective • Verification required" },
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
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