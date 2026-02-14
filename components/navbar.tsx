"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LOGO_SRC = "/9860629b-1d0a-478e-832b-12ba0e80fc0c.png";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "relative rounded-full px-3 py-2 text-sm",
        "text-white/70 hover:text-yellow-200 hover:bg-white/5",
        "transition",
        "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:rounded-full",
        "after:bg-yellow-300/70 after:scale-x-0 after:origin-left after:transition-transform",
        "hover:after:scale-x-100",
        active ? "text-yellow-200 bg-white/5 after:scale-x-100" : "",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function TinyLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "rounded-full px-3 py-1.5 text-xs",
        "text-white/55 hover:text-yellow-200 hover:bg-white/5",
        "transition",
        active ? "text-yellow-200 bg-white/5" : "",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
      {/* 👇 Navbar height controlled here — logo scaling will NOT stretch it */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        {/* LEFT: LOGO */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Bigger logo — doesn't affect navbar height because of flex centering */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-yellow-400/25 bg-black/30 shadow-[0_0_40px_rgba(255,204,77,0.16)]">
            <Image
              src={LOGO_SRC}
              alt="Aureon Collective logo"
              fill
              className="object-contain p-0"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-white">AUREON</div>
            <div className="text-xs text-white/55">crypto + cash app</div>
          </div>
        </Link>

        {/* RIGHT: NAV */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1">
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/order">Order</NavLink>
            <NavLink href="/payment">Payment</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* small legal link */}
          <div className="hidden sm:block">
            <TinyLink href="/terms">Terms</TinyLink>
          </div>
        </div>
      </div>
    </header>
  );
}