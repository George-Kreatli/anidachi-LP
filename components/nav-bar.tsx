import Link from "next/link";
import Image from "next/image";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 flex min-h-14 w-full items-center border-b border-white/10 bg-purple-900/80 backdrop-blur-md">
      <div className="container mx-auto flex w-full items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Image
            src="/Anidachi_logo.png"
            alt="AniDachi"
            width={28}
            height={28}
            className="object-contain"
          />
          AniDachi
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/" className="text-purple-100 hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blou" className="text-purple-100 hover:text-white transition-colors">
              Bloü
            </Link>
          </li>
          <li>
            <Link
              href="/quit-smoking"
              className="text-purple-100 hover:text-white transition-colors"
            >
              Quit smoking guides
            </Link>
          </li>
          <li>
            <Link
              href="/kreatli-email-crm"
              className="text-purple-100 hover:text-white transition-colors"
            >
              Kreatli Email CRM
            </Link>
          </li>
          <li>
            <Link href="/blou/privacy" className="text-purple-100 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/blou/terms" className="text-purple-100 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </li>
          <li>
            <a
              href="mailto:goshan.tolochko@gmail.com"
              className="text-purple-100 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
