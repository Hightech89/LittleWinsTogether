"use client";

import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  display_name: string;
  username: string | null;
  avatar_key: string | null;
  avatar_url: string | null;
  bio: string | null;
  general_location: string | null;
  profile_completed: boolean;
};

export type ProfileDraft = {
  displayName: string;
  username: string;
  avatarKey: string | null;
  bio: string;
  generalLocation: string;
};

export async function getCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export async function getProfileForUser(userId: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, username, avatar_key, avatar_url, bio, general_location, profile_completed")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile | null;
}

export async function hasCompletedProfile(user: User) {
  const profile = await getProfileForUser(user.id);

  return Boolean(profile?.profile_completed);
}

export async function saveProfileForUser(user: User, draft: ProfileDraft) {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: draft.displayName.trim(),
    username: normalizeUsername(draft.username),
    avatar_key: draft.avatarKey,
    avatar_url: null,
    bio: emptyToNull(draft.bio),
    general_location: emptyToNull(draft.generalLocation),
    profile_completed: true,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(error.message);
  }
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function emptyToNull(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}
