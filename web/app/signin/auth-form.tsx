"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasCompletedProfile } from "@/lib/profiles";

type AuthMode = "signin" | "signup";

type AuthFormProps = {
  initialMode?: AuthMode;
};

export function AuthForm({ initialMode = "signin" }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignUp = mode === "signup";
  const title = isSignUp ? "Create your account" : "Sign in";
  const buttonLabel = useMemo(() => {
    if (isSubmitting) {
      return isSignUp ? "Creating account..." : "Signing in...";
    }

    return isSignUp ? "Create account" : "Sign in";
  }, [isSignUp, isSubmitting]);

  const routeAfterAuth = useCallback(
    async (user: User) => {
      const completedProfile = await hasCompletedProfile(user);
      router.push(completedProfile ? "/conversations" : "/profile/setup");
    },
    [router]
  );

  useEffect(() => {
    async function routeSignedInUser() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase.auth.getSession();

        if (data.session?.user) {
          await routeAfterAuth(data.session.user);
        }
      } catch {
        setMessage(null);
      }
    }

    void routeSignedInUser();
  }, [routeAfterAuth]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const authResponse = isSignUp
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo:
                typeof window !== "undefined"
                  ? `${window.location.origin}/profile/setup`
                  : undefined
            }
          })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authResponse.error) {
        throw authResponse.error;
      }

      const user = authResponse.data.user;
      const session = authResponse.data.session;

      if (user && session) {
        await routeAfterAuth(user);
        return;
      }

      setMessage(
        "Please check your email to finish account verification. After verification, sign in here and we will help you set up your profile."
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-calm-100 sm:p-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-calm-700">Little Wins Together</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="text-base leading-relaxed text-slate-700">
            {isSignUp
              ? "Create an account with email access, then choose a public display name before joining conversations."
              : "Welcome back. Sign in with your email and password to continue to your profile or conversations."}
          </p>
        </div>

        <div className="rounded-2xl bg-calm-50 p-4 text-sm leading-relaxed text-calm-700 ring-1 ring-calm-100">
          Your email is only used for account access. It is private and will not be shown publicly.
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-800">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-800">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              placeholder={isSignUp ? "Create a password" : "Enter your password"}
              className="w-full rounded-2xl border border-calm-100 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-calm-300 focus:ring-2 focus:ring-calm-100"
            />
            {isSignUp ? (
              <p className="text-xs leading-relaxed text-slate-500">Use at least 6 characters.</p>
            ) : null}
          </div>

          {message ? (
            <div className="rounded-2xl bg-calm-50 p-4 text-sm leading-relaxed text-calm-700 ring-1 ring-calm-100">
              {message}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-relaxed text-rose-700 ring-1 ring-rose-100">
              {errorMessage}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-calm-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-calm-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-calm-300"
            >
              {buttonLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(isSignUp ? "signin" : "signup");
                setErrorMessage(null);
                setMessage(null);
              }}
              className="rounded-full border border-calm-100 bg-white px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:border-calm-200 hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {isSignUp ? "Sign in instead" : "Create an account"}
            </button>
            <Link
              href="/conversations"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-calm-700 transition-colors hover:bg-calm-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Browse conversations
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
