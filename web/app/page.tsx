import Link from "next/link";

const HERO_HEADLINE = "Celebrate Every Little Win Together";
const HERO_SUBHEADING = "A supportive community for parents raising children with autism.";
const PRIMARY_CTA = "Join the Community";
const SECONDARY_CTA = "Browse Conversations";

export default function HomePage() {
  return (
    <main className="pt-10 pb-20 sm:pt-12">
      <div className="flex flex-col gap-16">
        <section className="w-full rounded-3xl bg-white/80 p-10 shadow-sm ring-1 ring-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-calm-700">Little Wins Together</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.5rem]">
                Celebrate Every{" "}
                <span className="text-calm-600">
                  Little Win
                </span>{" "}
                Together
              </h1>
            </div>
            <p className="text-base leading-relaxed text-slate-700">
              {HERO_SUBHEADING}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/signin"
                className="rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {PRIMARY_CTA}
              </Link>
              <Link
                href="/conversations"
                className="rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {SECONDARY_CTA}
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="w-full">
          <div className="space-y-4">
            <h2
              id="features-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              What You&apos;ll Find Here
            </h2>
            <p className="max-w-2xl text-sm text-slate-600">
              A calm, encouraging space designed to support you through the everyday moments, questions, and
              celebrations that come with parenting.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-calm-100">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-calm-50 text-calm-600 ring-1 ring-calm-100">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    d="M5 6.75A3.75 3.75 0 0 1 8.75 3h6.5A3.75 3.75 0 0 1 19 6.75v4.5A3.75 3.75 0 0 1 15.25 15h-1.086a1 1 0 0 0-.707.293l-2.164 2.164A1 1 0 0 1 9 16.914V15H8.75A3.75 3.75 0 0 1 5 11.25z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Supportive Conversations
              </h3>
              <p className="text-sm leading-relaxed text-slate-700">
                Share experiences, ask questions, and connect with parents who understand.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-calm-100">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-calm-50 text-calm-600 ring-1 ring-calm-100">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    d="M11.25 4.5a.75.75 0 0 1 1.5 0v3.19l1.382-1.382a.75.75 0 0 1 1.06 1.06L13.06 9.5l2.132 2.132a.75.75 0 1 1-1.06 1.06L12.75 11.5v3.19a.75.75 0 0 1-1.5 0v-3.19l-1.382 1.382a.75.75 0 1 1-1.06-1.06L10.94 9.5 8.808 7.368a.75.75 0 0 1 1.06-1.06L11.25 7.69z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Celebrate Little Wins
              </h3>
              <p className="text-sm leading-relaxed text-slate-700">
                A place to recognize progress — no matter how small it may seem.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-calm-100">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-calm-50 text-calm-600 ring-1 ring-calm-100">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    d="M6.75 4A2.75 2.75 0 0 0 4 6.75v10.5A2.75 2.75 0 0 0 6.75 20h10.5A2.75 2.75 0 0 0 20 17.25V9.5a.75.75 0 0 0-1.5 0v7.75c0 .69-.56 1.25-1.25 1.25H6.75A1.25 1.25 0 0 1 5.5 17.25V6.75C5.5 6.06 6.06 5.5 6.75 5.5H14a.75.75 0 0 0 0-1.5z"
                    fill="currentColor"
                  />
                  <path
                    d="M18.5 4a.75.75 0 0 0-1.5 0v4.19l-1.32-1.32a.75.75 0 1 0-1.06 1.06l2.646 2.647a.75.75 0 0 0 1.06 0L20 7.93a.75.75 0 1 0-1.06-1.06l-1.44 1.44z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Helpful Resources
              </h3>
              <p className="text-sm leading-relaxed text-slate-700">
                Discover tools, services, and insights shared by the community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

