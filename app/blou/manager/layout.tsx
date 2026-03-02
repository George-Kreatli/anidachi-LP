import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blou Content Manager",
  description: "Internal tool to publish reels and carousels to Instagram.",
};

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f0f7f4]">
      <header className="border-b border-teal-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/blou"
            className="text-lg font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            Blou
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blou/manager"
              className="text-sm text-stone-500 hover:text-teal-600 transition-colors"
            >
              Connect
            </Link>
            <Link
              href="/blou/manager/publish"
              className="text-sm text-stone-500 hover:text-teal-600 transition-colors"
            >
              Publish
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
}
