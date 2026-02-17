"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GlowCard, GlowButton, PageTitle } from "../../components/ui";

function makeOrderId() {
  const a = Math.random().toString(16).slice(2, 6).toUpperCase();
  const b = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `AUR-${a}-${b}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs text-white/60">{label}</span>
      {children}
    </label>
  );
}

// Slightly taller inputs so text never clips
const inputCls =
  "rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 min-h-[42px] text-sm text-white leading-[1.35] " +
  "outline-none focus:border-yellow-400/25 focus:shadow-[0_0_30px_rgba(255,204,77,0.12)] " +
  "disabled:opacity-70 disabled:cursor-not-allowed";

function OrderInner() {
  const sp = useSearchParams();

  const presetProduct = sp.get("product") || "";
  const presetPrice = sp.get("price") || "";

  const presetLocked = Boolean(presetProduct || presetPrice);

  const [product, setProduct] = useState(presetProduct);
  const [price, setPrice] = useState(presetPrice);
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const [website, setWebsite] = useState("");

  const COOLDOWN_MS = 30_000;
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const [tick, setTick] = useState(0);

  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 250);
    return () => clearInterval(t);
  }, []);

  // keep TS happy, and ensures rerender on interval
  void tick;

  const cooldownLeft = Math.max(0, cooldownUntil - Date.now());
  const canGenerate = cooldownLeft === 0 && !sending;

  const summary = useMemo(() => {
    return {
      product: product.trim() || "—",
      price: price.trim() || "—",
      contact: contact.trim() || "—",
    };
  }, [product, price, contact]);

  async function generateAndSend() {
    setStatusMsg(null);

    const p = product.trim();
    const pr = price.trim();
    const c = contact.trim();

    if (!p || !pr || !c) {
      setStatusMsg("Please fill Product, Price, and Contact before generating an Order ID.");
      return;
    }

    const id = makeOrderId();
    setOrderId(id);

    setCooldownUntil(Date.now() + COOLDOWN_MS);

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: p,
          price: pr,
          contact: c,
          details,
          orderId: id,
          website,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatusMsg(data?.error || "Failed to save order. Try again.");
      } else {
        setStatusMsg("Order saved. Now go to Payment and include your Order ID in the note/memo.");
      }
    } catch {
      setStatusMsg("Network error. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        title="Create Order"
        subtitle="Generate an Order ID and include it with your payment. This helps match payments to your order."
      />

      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 text-sm text-yellow-200">
        <div className="font-semibold">Before purchase:</div>
        <div className="mt-1 text-white/75">
          Join the Discord and make a ticket:
          <a
            href="https://discord.gg/knuz3yfWdU"
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-yellow-200 underline decoration-yellow-300/60 hover:text-yellow-100"
          >
            https://discord.gg/knuz3yfWdU
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <GlowCard>
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-yellow-200">Order details</div>

            {presetLocked ? (
              <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                Preset locked
              </span>
            ) : null}
          </div>

          <div style={{ position: "absolute", left: "-99999px", top: "-99999px" }} aria-hidden="true">
            <label>
              Website
              <input value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <div className="mt-4 grid gap-3">
            <Field label="What are you buying?">
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className={inputCls}
                placeholder="Product / service name"
                disabled={presetLocked && Boolean(presetProduct)}
              />
            </Field>

            <Field label="Price">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputCls}
                placeholder="$60 or 25 USDT (TRON)"
                disabled={presetLocked && Boolean(presetPrice)}
              />
            </Field>

            <Field label="Your contact (email/discord)">
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={inputCls}
                placeholder="email@example.com and discord user"
              />
            </Field>

            <Field label="Extra details (optional)">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={inputCls + " min-h-[140px] resize-y leading-[1.5]"}
                placeholder="Anything you want us to know…"
              />
            </Field>

            {presetLocked ? (
              <div className="text-xs text-white/55">
                Coming from Products page presets the listing & price to prevent edits.
              </div>
            ) : null}

            {statusMsg ? (
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                {statusMsg}
              </div>
            ) : null}

            <div className="mt-2 flex flex-wrap gap-2">
              <GlowButton type="button" onClick={generateAndSend} disabled={!canGenerate}>
                {sending
                  ? "Saving…"
                  : cooldownLeft > 0
                  ? `Cooldown (${Math.ceil(cooldownLeft / 1000)}s)`
                  : "Generate Order ID"}
              </GlowButton>

              {orderId ? (
                <button
                  type="button"
                  onClick={() => setOrderId(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 active:scale-[0.98]"
                >
                  Reset
                </button>
              ) : null}
            </div>
          </div>
        </GlowCard>

        <GlowCard>
          <div className="text-sm font-semibold text-yellow-200">Summary & next steps</div>

          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <div>
              <span className="text-white/55">Product:</span> {summary.product}
            </div>
            <div>
              <span className="text-white/55">Price:</span> {summary.price}
            </div>
            <div>
              <span className="text-white/55">Contact:</span> {summary.contact}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-yellow-400/15 bg-yellow-400/5 p-4">
            <div className="text-xs text-white/65">Order ID</div>
            <div className="mt-1 font-mono text-lg text-yellow-200">{orderId ?? "— generate one —"}</div>
            <div className="mt-2 text-xs text-white/55">
              Include this in your Cash App note / crypto memo if available.
            </div>
          </div>

          <div className="mt-5 text-sm text-white/70">
            After you generate an Order ID:
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-white/65">
              <li>Go to the Payment page.</li>
              <li>Send the exact amount.</li>
              <li>Include the Order ID in the note/memo.</li>
              <li>We fulfill after payment is confirmed.</li>
            </ol>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

export default function OrderPage() {
  // ✅ THIS is what fixes Vercel: Suspense boundary around useSearchParams()
  return (
    <Suspense fallback={<div className="text-white/70">Loading…</div>}>
      <OrderInner />
    </Suspense>
  );
}