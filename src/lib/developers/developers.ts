// developers.ts
// Data actions for Karnataka developer profiles with mock fallbacks

import { createClient } from "../supabase/client";
import { mockDevelopers } from "../data/mockDevelopers";
import { Developer } from "../types/developerMarketplace";
import { isSupabaseConfigured } from "../env";

export async function getDevelopers(): Promise<Developer[]> {
  if (!isSupabaseConfigured()) {
    return mockDevelopers;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("developers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching developers from Supabase:", error.message);
      return mockDevelopers;
    }

    return (data as Developer[]) || mockDevelopers;
  } catch (err) {
    console.error("Failed to fetch developers:", err);
    return mockDevelopers;
  }
}

export async function getDeveloperBySlug(slug: string): Promise<Developer | null> {
  if (!isSupabaseConfigured()) {
    return mockDevelopers.find((d) => d.slug === slug) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("developers")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching developer ${slug}:`, error.message);
      return mockDevelopers.find((d) => d.slug === slug) || null;
    }

    return (data as Developer) || mockDevelopers.find((d) => d.slug === slug) || null;
  } catch (err) {
    console.error(`Failed to fetch developer by slug ${slug}:`, err);
    return mockDevelopers.find((d) => d.slug === slug) || null;
  }
}
