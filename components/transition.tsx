"use client";

import { usePathname } from "next/navigation";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // key forces remount on route change -> animation replays
  return (
    <div key={pathname} className="animate-routeIn">
      {children}
    </div>
  );
}