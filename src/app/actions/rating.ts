"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Submit or update a rating for a project.
 * Uses a visitor_id (fingerprint from the client) to allow one vote per visitor per project.
 */
export async function submitRating(projectKey: string, score: number, visitorId: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, message: "Database not configured." };
  }

  if (score < 1 || score > 5) {
    return { success: false, message: "Score must be between 1 and 5." };
  }

  try {
    // Upsert: insert or update on conflict (project_key, visitor_id)
    const { error } = await supabase
      .from("project_ratings")
      .upsert(
        { project_key: projectKey, score, visitor_id: visitorId },
        { onConflict: "project_key,visitor_id" }
      );

    if (error) {
      console.error("Rating upsert error:", error);
      return { success: false, message: "Could not save rating." };
    }

    // Fetch updated aggregate
    const { data: summary, error: summaryError } = await supabase
      .from("project_ratings_summary")
      .select("total_votes, average")
      .eq("project_key", projectKey)
      .single();

    if (summaryError || !summary) {
      return { success: true, totalVotes: 1, average: score };
    }

    return {
      success: true,
      totalVotes: summary.total_votes as number,
      average: summary.average as number,
    };
  } catch (err) {
    console.error("Rating server error:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

/**
 * Fetch the aggregate ratings for all projects in one call.
 */
export async function fetchAllRatings(): Promise<Record<string, { totalVotes: number; average: number }>> {
  const supabase = getSupabase();
  if (!supabase) return {};

  try {
    const { data, error } = await supabase
      .from("project_ratings_summary")
      .select("project_key, total_votes, average");

    if (error || !data) return {};

    const result: Record<string, { totalVotes: number; average: number }> = {};
    for (const row of data) {
      result[row.project_key] = {
        totalVotes: row.total_votes,
        average: row.average,
      };
    }
    return result;
  } catch {
    return {};
  }
}
