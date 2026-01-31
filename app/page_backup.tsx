
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Integral Labs Admin</h1>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/blog"
          className="border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
        >
          View Public Blog
        </Link>
      </div>
    </main>
  );
}
