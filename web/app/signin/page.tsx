import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <section className="w-full max-w-2xl rounded-3xl bg-white/80 p-10 shadow-sm ring-1 ring-calm-100">
        <div className="space-y-5">
          <p className="text-sm font-medium text-calm-700">Little Wins Together</p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Sign In
            </h1>
            <p className="text-base leading-relaxed text-slate-700">
              Account access is coming soon. Soon you&rsquo;ll be able to join the community, post conversations, and reply with a display name.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Create an account
            </Link>
            <Link
              href="/conversations"
              className="inline-flex rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Browse Conversations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
