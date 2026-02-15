import "./globals.css";
import { Navbar } from "../components/navbar";
import { RouteTransition } from "../components/transition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* Fixed animated background (never clips) */}
        <div aria-hidden className="ac-bg">
          <div className="ac-grid" />
          <div className="ac-blob ac-blob-1" />
          <div className="ac-blob ac-blob-2" />
          <div className="ac-blob ac-blob-3" />
          <div className="ac-vignette" />
        </div>

        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* extra top padding so content never kisses the sticky navbar */}
          <main className="flex-1 w-full px-4 pt-16 sm:pt-20 pb-20">
            <RouteTransition>{children}</RouteTransition>
          </main>

          {/* Cleaner footer, no “cutoff” border */}
          <footer className="w-full px-4 pb-10 pt-10 text-sm text-white/60">
            <div className="mx-auto w-full max-w-6xl">
              <div className="ac-footerfade rounded-2xl px-5 py-5">
                <div>© Aureon Collective</div>
                <div className="mt-1 text-white/45">
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