import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="py-16">
      <section className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-calm-100 sm:p-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-calm-700">Step 1 of 2</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="text-base leading-relaxed text-slate-700">
              Start with email access, then set up a community profile before posting or replying. Your email will never be shown publicly.
            </p>
          </div>

          <form className="space-y-5" aria-label="Create account placeholder form">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-800">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
              />
              <p className="text-xs leading-relaxed text-slate-500">
                Used for account access only. It will not appear on your public profile.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-800">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
              />
            </div>
          </form>

          <div className="rounded-2xl bg-calm-50 p-4 text-sm leading-relaxed text-calm-700 ring-1 ring-calm-100">
            Account creation is a placeholder for now while backend authentication is being prepared.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/profile/setup"
              className="rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Continue to profile setup
            </Link>
            <Link
              href="/signin"
              className="rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
