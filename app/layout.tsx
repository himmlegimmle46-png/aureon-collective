import "./globals.css";
import { Navbar } from "../components/navbar";
import { RouteTransition } from "../components/transition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* ✅ FIX: Use FIXED background layers so there is NEVER a bottom cutoff */}
        <div aria-hidden className="aureon-bg" />
        <div aria-hidden className="aureon-vignette" />
        <div aria-hidden className="aureon-blob aureon-blob-1" />
        <div aria-hidden className="aureon-blob aureon-blob-2" />

        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* ✅ Keep content below sticky navbar */}
          <main className="flex-1 w-full px-4 pt-16 sm:pt-20 pb-16">
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
      </body>
    </html>
  );
}