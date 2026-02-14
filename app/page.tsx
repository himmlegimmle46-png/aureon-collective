import Link from "next/link";
import { GlowCard, GlowButton, PageTitle } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-[240px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-yellow-400/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* HERO */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
              <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
              Premium storefront • fast delivery • order ID system
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="text-white">Aureon</span>{" "}
              <span className="text-yellow-200">Collective</span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-white/70">
              Clean ordering flow with an <span className="text-yellow-200 font-semibold">Order ID</span> you include in
              your payment note/memo. We fulfill only after you confirm payment.
            </p>

            <div className="flex flex-wrap gap-2">
              <GlowButton href="/products">Browse products</GlowButton>
              <GlowButton href="/order" variant="ghost">
                Create order
              </GlowButton>
              <Link
                href="/payment"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 active:scale-[0.98]"
              >
                Payment info
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Step 1</div>
                <div className="mt-1 text-sm font-semibold text-yellow-200">Create an Order ID</div>
                <div className="mt-1 text-xs text-white/60">Generate it from the Order page.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Step 2</div>
                <div className="mt-1 text-sm font-semibold text-yellow-200">Pay with note/memo</div>
                <div className="mt-1 text-xs text-white/60">Include the Order ID in the payment.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Step 3</div>
                <div className="mt-1 text-sm font-semibold text-yellow-200">Discord ticket</div>
                <div className="mt-1 text-xs text-white/60">We confirm payment & deliver.</div>
              </div>
            </div>
          </div>

          {/* RIGHT: FEATURED */}
          <GlowCard className="p-0 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-white/10">
              <PageTitle
                title="Featured listing"
                subtitle="Single featured product. Stock & price live on the product page."
              />
            </div>

            <div className="p-6 sm:p-8 grid gap-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">Bee Swarm Account (Tad alt)</div>
                  <div className="mt-1 text-sm text-white/60">
                    View details, images, and specs on the product page.
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
                    $60
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/10 px-3 py-1 text-xs text-red-200">
                    <span className="h-2 w-2 rounded-full bg-red-300" />
                    Not In stock
                  </div>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/55">Verification</div>
                  <div className="mt-1 text-sm text-white/70">
                    Orders fulfilled after payment is confirmed. Order IDs prevent mix-ups.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/55">Support</div>
                  <div className="mt-1 text-sm text-white/70">
                    Before purchase, join Discord and open a ticket.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <GlowButton href="/products">View listing</GlowButton>
                <GlowButton href="/order?product=Bee%20Swarm%20Account%20(Tad%20alt)&price=60" variant="ghost">
                  Start order
                </GlowButton>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Trust / Info strip */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-yellow-200">Clear flow</div>
            <div className="mt-2 text-sm text-white/65">
              Order ID ties your payment to your order so nothing gets lost.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-yellow-200">Fast verification</div>
            <div className="mt-2 text-sm text-white/65">
              We confirm payment in Discord tickets and complete fulfillment after.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-yellow-200">Payments</div>
            <div className="mt-2 text-sm text-white/65">
              Cash App + crypto (TRON/USDT). See the Payment page for addresses.
            </div>
          </div>
        </div>

        {/* spacing so footer never feels “cut off” */}
        <div className="h-10" />
      </div>
    </div>
  );
}