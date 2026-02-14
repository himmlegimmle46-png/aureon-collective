import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="text-sm font-semibold text-yellow-200">Aureon Collective</div>
            <p className="mt-2 text-sm text-white/60">
              Payments accepted: Crypto (TRON/USDT) & Cash App. Orders are fulfilled after payment verification.
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="grid gap-2 text-sm">
              <div className="text-white/70 font-semibold">Pages</div>
              <Link href="/products" className="text-white/60 hover:text-white">Products</Link>
              <Link href="/order" className="text-white/60 hover:text-white">Order</Link>
              <Link href="/payment" className="text-white/60 hover:text-white">Payment</Link>
              <Link href="/contact" className="text-white/60 hover:text-white">Contact</Link>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="text-white/70 font-semibold">Legal</div>
              <Link href="/terms" className="text-white/60 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/45">
          <div>© {new Date().getFullYear()} Aureon Collective</div>
          <div>Not affiliated with Roblox or any game developers.</div>
        </div>
      </div>
    </footer>
  );
}