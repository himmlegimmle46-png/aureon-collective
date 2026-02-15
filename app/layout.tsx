import "./globals.css";
import { Navbar } from "../components/navbar";
import { RouteTransition } from "../components/transition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* Extra top padding so content never kisses the sticky navbar */}
          <main className="flex-1 w-full px-4 pt-16 sm:pt-20 pb-20">
            <RouteTransition>{children}</RouteTransition>
          </main>

          {/* Footer */}
          <footer className="w-full px-4 pb-10 pt-10 text-sm text-white/60">
            <div className="mx-auto w-full max-w-6xl">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
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