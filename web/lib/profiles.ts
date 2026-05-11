"use client";

import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  display_name: string | null;
  avatar_choice: string | null;
  bio: string | null;
  general_location: string | null;
  profile_completed: boolean;
};

export type ProfileDraft = {
  displayName: string;
  avatarChoice: string | null;
  bio: string;
  generalLocation: string;
};

export async function getCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

export async function getProfileForUser(userId: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_choice, bio, general_location, profile_completed")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
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
    avatar_choice: draft.avatarChoice,
    bio: emptyToNull(draft.bio),
    general_location: emptyToNull(draft.generalLocation),
    profile_completed: true,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw error;
  }
}

function emptyToNull(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}
