import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { verifyKreatliCrmSession } from "@/lib/kreatli-crm/auth";
import { BlouLoginForm } from "./blou-login-form";

export const dynamic = "force-dynamic";

export default async function BlouLoginPage() {
  if (await verifyKreatliCrmSession()) {
    redirect("/blou");
  }

  return (
    <main className="min-h-screen bg-[#f0f7f4]">
      <header className="border-b border-teal-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold text-stone-600 transition-colors hover:text-stone-900">
            AniDachi
          </Link>
          <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-teal-600">
            Home
          </Link>
        </div>
      </header>
      <div className="container mx-auto flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
        <Suspense fallback={<p className="text-sm text-stone-600">Loading…</p>}>
          <BlouLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
