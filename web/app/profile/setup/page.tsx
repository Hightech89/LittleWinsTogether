import Link from "next/link";

const avatarOptions = ["Gentle blue", "Warm sunrise", "Quiet leaf"];

export default function ProfileSetupPage() {
  return (
    <main className="py-16">
      <section className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-calm-100 sm:p-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-calm-700">Step 2 of 2</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Set up your community profile
            </h1>
            <p className="text-base leading-relaxed text-slate-700">
              Choose how you want to appear in Little Wins Together. You do not need to use your real name or a personal photo.
            </p>
          </div>

          <div className="rounded-2xl bg-calm-50 p-4 text-sm leading-relaxed text-calm-700 ring-1 ring-calm-100">
            Your email stays private. If you add a location, keep it general, such as a state, province, country, or region — not a full address.
          </div>

          <form className="space-y-7" aria-label="Profile setup placeholder form">
            <div className="space-y-2">
              <label htmlFor="display-name" className="text-sm font-medium text-slate-800">
                Display name or username <span className="text-calm-700">*</span>
              </label>
              <input
                id="display-name"
                name="display-name"
                type="text"
                placeholder="A name other parents can recognize"
                required
                className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
              />
              <p className="text-xs leading-relaxed text-slate-500">
                Real names are not required. Choose a name that feels comfortable for community conversations.
              </p>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-slate-800">
                Choose a default avatar
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {avatarOptions.map((avatar, index) => (
                  <label
                    key={avatar}
                    className="flex items-center gap-3 rounded-2xl border border-calm-100 bg-white p-4 text-sm text-slate-700 shadow-sm"
                  >
                    <input
                      type="radio"
                      name="avatar"
                      defaultChecked={index === 0}
                      className="h-4 w-4 border-calm-200 text-calm-600 focus:ring-calm-500"
                    />
                    <span>{avatar}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Profile pictures can stay optional. Default avatars are available if you prefer not to upload a personal photo.
              </p>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-slate-800">
                  General location <span className="text-slate-500">optional</span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Missouri, Ontario, UK..."
                  className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium text-slate-800">
                  Short bio <span className="text-slate-500">optional</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="A short note about what brings you here"
                  className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
                />
              </div>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/conversations"
              className="rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Finish profile setup
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Back to account step
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
