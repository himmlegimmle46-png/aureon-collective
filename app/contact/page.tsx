import Link from "next/link";
import { GlowCard, GlowButton, PageTitle } from "../../components/ui";

export default function ContactPage() {
  const discord = "https://discord.gg/knuz3yfWdU";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-6">
        <PageTitle
          title="Contact"
          subtitle="Questions about an order? Include your Order ID so you can be helped faster."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <GlowCard className="p-6">
            <div className="text-sm font-semibold text-yellow-200">Discord support</div>

            <div className="mt-3 text-sm text-white/70">
              Join our Discord and open a ticket:
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/55">Invite</div>
              <div className="mt-1 font-mono text-sm text-white break-all">{discord}</div>
            </div>

            <div className="mt-3 text-xs text-white/55">
              Include your <span className="text-white/80 font-semibold">Order ID</span> in the ticket if you have one.
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <GlowButton href={discord}>Open Discord</GlowButton>
              <GlowButton href="/order" variant="ghost">
                Create order
              </GlowButton>
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <div className="text-sm font-semibold text-yellow-200">Fast help checklist</div>

            <div className="mt-3 text-sm text-white/70">
              When you message support, sending these upfront saves time:
            </div>

            <ul className="mt-4 grid gap-2 text-sm text-white/65">
              <li className="flex gap-2">
                <span className="text-yellow-200/80">•</span>
                <span>Your <span className="text-white/80 font-semibold">Order ID</span></span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-200/80">•</span>
                <span>Payment method (Cash App / Crypto)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-200/80">•</span>
                <span>Amount sent + time sent</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-200/80">•</span>
                <span>For crypto: transaction hash</span>
              </li>
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
              Tip: If you haven’t created an Order ID yet, do that first so your payment can be matched quickly.
            </div>

            <div className="mt-5">
              <Link
                href="/payment"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 active:scale-[0.98]"
              >
                View payment info
              </Link>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}