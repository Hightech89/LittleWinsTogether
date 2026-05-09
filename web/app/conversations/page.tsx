import Link from "next/link";

export default function ConversationsPage() {
  return (
    <main className="py-16">
      <section className="rounded-3xl bg-white/80 p-10 shadow-sm ring-1 ring-calm-100">
        <div className="max-w-2xl space-y-5">
          <p className="text-sm font-medium text-calm-700">Conversations</p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Browse Conversations
            </h1>
            <p className="text-base leading-relaxed text-slate-700">
              Public conversations are coming soon. This will be a calm place to read community discussions before signing in to post or reply.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </main>
  );
}
