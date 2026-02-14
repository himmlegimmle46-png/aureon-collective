import "./globals.css";
import { Navbar } from "../components/navbar";
import { RouteTransition } from "../components/transition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Subtle global glow (lighter so inner pages don't look "foggy") */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 420px at 50% 10%, rgba(255, 204, 77, 0.09), transparent 62%)," +
                "radial-gradient(700px 380px at 20% 35%, rgba(255, 204, 77, 0.06), transparent 60%)," +
                "radial-gradient(700px 380px at 80% 45%, rgba(255, 204, 77, 0.05), transparent 60%)," +
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.88) 100%)",
            }}
          />

          {/* Subtle vignette (also reduced) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px 900px at 50% 40%, transparent 55%, rgba(0,0,0,0.62) 92%)",
            }}
          />

          <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Keep consistent spacing; pages can still do their own max-w inside */}
            <main className="flex-1 w-full px-4 pt-10 pb-16">
              <RouteTransition>{children}</RouteTransition>
            </main>

            <footer className="w-full px-4 pb-10 pt-10 text-sm text-white/60">
              <div className="mx-auto w-full max-w-6xl">
                <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
                  <div>© Aureon Collective</div>
                  <div className="text-white/45">
                    Payments accepted: Crypto & Cash App. Orders fulfilled after payment verification.
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}