import Link from "next/link";

export function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        "border-white/10 bg-black/35",
        "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
        "transition hover:border-yellow-400/20 hover:bg-black/45",
        className,
      ].join(" ")}
    >
      {/* subtle highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-yellow-400/6 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

type GlowButtonVariant = "solid" | "ghost";

export function GlowButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  disabled = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
  variant?: GlowButtonVariant;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold " +
    "border transition active:scale-[0.98]";

  const solid =
    "bg-yellow-400/12 text-yellow-100 border-yellow-400/22 " +
    "hover:bg-yellow-400/18 hover:border-yellow-400/30 " +
    "shadow-[0_0_0_1px_rgba(255,204,77,0.06),0_10px_30px_rgba(0,0,0,0.35)]";

  const ghost =
    "bg-white/5 text-white/80 border-white/12 hover:bg-white/8 hover:border-white/18";

  const disabledCls = "opacity-60 cursor-not-allowed pointer-events-none";

  const cls = [base, variant === "ghost" ? ghost : solid, disabled ? disabledCls : ""].join(" ");

  if (href) {
    return (
      <Link className={cls} href={href} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function SubtleButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
      {subtitle ? <p className="text-sm text-white/65 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}