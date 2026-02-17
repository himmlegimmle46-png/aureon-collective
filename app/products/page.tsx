"use client";

import Image from "next/image";
import { useState } from "react";
import { GlowCard, GlowButton, PageTitle } from "../../components/ui";
import { PRODUCT, STOCK_COUNT, IN_STOCK, stockBadge } from "../../lib/product";

export default function ProductsPage() {
  const [active, setActive] = useState<(typeof PRODUCT.images)[number]>(PRODUCT.images[0]);

  const orderHref = `/order?product=${encodeURIComponent(PRODUCT.name)}&price=${encodeURIComponent(
    PRODUCT.priceValue
  )}`;

  const { badgeClasses, dotClass, label } = stockBadge();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-6">
        <PageTitle title="Products" subtitle="Single listing. Stock + images are managed here." />

        <GlowCard className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* LEFT: Gallery */}
            <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r sm:p-6">
              <div className="grid gap-4">
                {/* Main image */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={active} alt="Product preview" fill className="object-contain p-3" priority />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-2 gap-3">
                  {PRODUCT.images.map((src: (typeof PRODUCT.images)[number]) => {
                    const isActive = active === src;
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActive(src)}
                        className={[
                          "group relative overflow-hidden rounded-2xl border",
                          "bg-black/30 transition",
                          "hover:bg-black/40 hover:border-white/20",
                          "active:scale-[0.99]",
                          isActive ? "border-yellow-400/25" : "border-white/10",
                        ].join(" ")}
                        aria-label="View image"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={src} alt="Product thumbnail" fill className="object-cover" />
                        </div>
                        <div
                          className={[
                            "pointer-events-none absolute inset-0 opacity-0 transition",
                            "bg-[radial-gradient(circle_at_35%_25%,rgba(255,204,77,0.16),transparent_60%)]",
                            isActive ? "opacity-100" : "group-hover:opacity-60",
                          ].join(" ")}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">{PRODUCT.name}</div>
                  <div className="mt-2 text-sm text-white/70">{PRODUCT.description}</div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                    {PRODUCT.priceLabel}
                  </div>

                  {/* ✅ AUTO: text + border/bg/text + dot */}
                  <div
                    className={[
                      "mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border",
                      badgeClasses,
                    ].join(" ")}
                  >
                    <span className={["h-2 w-2 rounded-full", dotClass].join(" ")} />
                    {label}
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm font-semibold text-yellow-200">Specs</div>
                <ul className="mt-3 grid gap-1.5 text-sm text-white/70">
                  {PRODUCT.specs.map((s: (typeof PRODUCT.specs)[number]) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-yellow-200/80">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-2">
                {IN_STOCK ? (
                  <GlowButton href={orderHref}>Create order</GlowButton>
                ) : (
                  <button
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/60"
                    disabled
                  >
                    Out of stock
                  </button>
                )}

                <GlowButton href="/payment" variant="ghost">
                  Payment info
                </GlowButton>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/65">
                  Stock: <span className="font-mono text-white/80">{STOCK_COUNT}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/65">
                Before ordering, join Discord and open a ticket:{" "}
                <a
                  href={PRODUCT.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-200 underline decoration-yellow-300/40 hover:text-yellow-100"
                >
                  {PRODUCT.discordShort}
                </a>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}