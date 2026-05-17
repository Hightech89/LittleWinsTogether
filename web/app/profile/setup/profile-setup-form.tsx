"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, getProfileForUser, saveProfileForUser } from "@/lib/profiles";

const avatarOptions = [
  { value: "gentle-blue", label: "Gentle blue" },
  { value: "warm-sunrise", label: "Warm sunrise" },
  { value: "quiet-leaf", label: "Quiet leaf" }
];

export function ProfileSetupForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarKey, setAvatarKey] = useState(avatarOptions[0].value);
  const [bio, setBio] = useState("");
  const [generalLocation, setGeneralLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          router.replace("/signin");
          return;
        }

        setUser(currentUser);
        const profile = await getProfileForUser(currentUser.id);

        if (profile) {
          setDisplayName(profile.display_name);
          setUsername(profile.username ?? "");
          setAvatarKey(profile.avatar_key ?? avatarOptions[0].value);
          setBio(profile.bio ?? "");
          setGeneralLocation(profile.general_location ?? "");
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "We could not load your profile setup yet. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadProfile();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      router.push("/signin");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await saveProfileForUser(user, {
        displayName,
        username,
        avatarKey,
        bio,
        generalLocation
      });
      router.push("/conversations");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not save your profile yet. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-calm-100 sm:p-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-calm-700">Step 2 of 2</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Set up your community profile
          </h1>
          <p className="text-base leading-relaxed text-slate-700">
            Choose how you want to appear in Little Wins Together before posting or replying later.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-calm-50 p-4 text-sm leading-relaxed text-calm-700 ring-1 ring-calm-100">
            Use a display name you&rsquo;re comfortable sharing publicly. You do not need to use your real name or personal photo.
          </div>
          <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-slate-600 ring-1 ring-calm-100">
            Your email stays private. If you add a location, keep it general, such as a state, province, country, or region, not a full address.
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-slate-600 ring-1 ring-calm-100">
            Loading your profile setup...
          </div>
        ) : (
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="display-name" className="text-sm font-medium text-slate-800">
                Display name <span className="text-calm-700">*</span>
              </label>
              <input
                id="display-name"
                name="display-name"
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="A name other parents can recognize"
                required
                maxLength={80}
                className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
              />
              <p className="text-xs leading-relaxed text-slate-500">
                Real names are not required. Choose a name that feels comfortable for community conversations.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-slate-800">
                Username <span className="text-calm-700">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="littlewinsparent"
                required
                minLength={3}
                maxLength={30}
                pattern="[A-Za-z0-9_]+"
                className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
              />
              <p className="text-xs leading-relaxed text-slate-500">
                Use 3-30 letters, numbers, or underscores. This can be different from your display name.
              </p>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-slate-800">
                Choose a default avatar <span className="text-slate-500">optional</span>
              </legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {avatarOptions.map((avatar) => (
                  <label
                    key={avatar.value}
                    className="flex items-center gap-3 rounded-2xl border border-calm-100 bg-white p-4 text-sm text-slate-700 shadow-sm"
                  >
                    <input
                      type="radio"
                      name="avatar"
                      value={avatar.value}
                      checked={avatarKey === avatar.value}
                      onChange={(event) => setAvatarKey(event.target.value)}
                      className="h-4 w-4 border-calm-200 text-calm-600 focus:ring-calm-500"
                    />
                    <span>{avatar.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Default avatars are available if you prefer not to upload a personal photo.
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
                  value={generalLocation}
                  onChange={(event) => setGeneralLocation(event.target.value)}
                  maxLength={120}
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
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  maxLength={240}
                  placeholder="A short note about what brings you here"
                  className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
                />
              </div>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-relaxed text-rose-700 ring-1 ring-rose-100">
                {errorMessage}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-calm-300"
              >
                {isSaving ? "Saving profile..." : "Finish profile setup"}
              </button>
              <Link
                href="/signin"
                className="rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
