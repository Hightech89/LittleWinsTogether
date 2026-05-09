import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Wins Together",
  description: "A supportive space for parents raising children with autism."
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#f7fbff] via-white to-[#edf3ff] text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4">
          <header className="pt-4 border-b border-white/60">
            <nav className="flex items-center justify-between text-sm text-slate-600">
              <Link
                href="/"
                className="rounded-full px-3 py-1 text-sm font-medium text-calm-700 transition-colors hover:bg-white/60 hover:text-calm-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Little Wins Together
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/conversations"
                  className="rounded-full px-3 py-1 text-sm font-medium text-calm-700 transition-colors hover:bg-white/60 hover:text-calm-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Browse Conversations
                </Link>
                <Link
                  href="/signin"
                  className="rounded-full px-3 py-1 text-sm font-medium text-calm-700 transition-colors hover:bg-white/60 hover:text-calm-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

