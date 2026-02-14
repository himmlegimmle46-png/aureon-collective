import { GlowCard, PageTitle, GlowButton } from "../../components/ui";

export default function PaymentPage() {
  const cashTag = "$REDACTED8472";
  const SOL = "9jUV2DJLWJdizTvStTYoG1kWmK2gRCwjqM11jepCkFdQ";
  const USDT_TRON = "THBuxDgu1t2oZccmSCVu2yr9AEZ6BzUsSg";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-6">
        <PageTitle
          title="Payment"
          subtitle="Include your Order ID in the Cash App note or crypto memo when possible. Fulfillment begins after payment verification."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <GlowCard className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-yellow-200">Cash App</div>
                <div className="mt-2 text-sm text-white/70">
                  Send to: <span className="ml-2 font-mono text-white">{cashTag}</span>
                </div>
                <div className="mt-2 text-xs text-white/55">Put your Order ID in the note.</div>
              </div>

              <GlowButton href="/order" variant="ghost">
                Create order
              </GlowButton>
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <div className="text-sm font-semibold text-yellow-200">Crypto payments</div>

            <div className="mt-4 grid gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-wide text-yellow-300">
                  USDT — TRON NETWORK ONLY (TRC20)
                </div>
                <div className="mt-2 font-mono break-all text-white">{USDT_TRON}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-wide text-yellow-300">Solana (SOL)</div>
                <div className="mt-2 font-mono break-all text-white">{SOL}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70">
              <span className="text-yellow-200 font-semibold">⚠️ Warning:</span> Send USDT using the{" "}
              <span className="font-semibold">TRON / TRC20 network only</span>. Sending from Ethereum, BSC, or other
              networks can result in permanent loss.
              <div className="mt-2 text-white/55">Include your Order ID in memo if supported.</div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}