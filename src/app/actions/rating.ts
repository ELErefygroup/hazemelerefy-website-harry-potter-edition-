"use server";

import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Retrieve the client's actual IP address securely on the server.
 */
async function getClientIp(): Promise<string> {
  try {
    const headerList = await headers();
    const rawIp = headerList.get("x-forwarded-for")?.split(",")[0] || headerList.get("x-real-ip") || "127.0.0.1";
    return rawIp.trim();
  } catch {
    return "127.0.0.1";
  }
}

/**
 * Retrieve visitor geolocation hints from Vercel's Edge Network headers.
 */
async function getGeoDetails(): Promise<string> {
  try {
    const headerList = await headers();
    const city = headerList.get("x-vercel-ip-city") || "";
    const country = headerList.get("x-vercel-ip-country") || "";
    if (city && country) {
      return `${city}, ${country}`;
    } else if (country) {
      return country;
    }
    return "Unknown Realm";
  } catch {
    return "Unknown Realm";
  }
}

/**
 * Submit or update a rating for a project.
 * Uses a server-side IP address to guarantee 1 unique vote per person/device.
 */
export async function submitRating(projectKey: string, score: number, clientVisitorId: string) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, message: "Database not configured." };
  }

  if (score < 1 || score > 5) {
    return { success: false, message: "Score must be between 1 and 5." };
  }

  try {
    const ip = await getClientIp();
    const geo = await getGeoDetails();
    const databaseVisitorId = `ip:${ip}`;

    console.log(`[RATING SUBMIT] Project: ${projectKey}, Score: ${score}, IP: ${ip}, Location: ${geo}, BrowserID: ${clientVisitorId}`);

    // Upsert: insert or update on conflict (project_key, visitor_id)
    const { error } = await supabase
      .from("project_ratings")
      .upsert(
        { project_key: projectKey, score, visitor_id: databaseVisitorId },
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

/**
 * Fetch all ratings previously submitted by this visitor (based on server IP).
 */
export async function fetchVisitorRatings(): Promise<Record<string, number>> {
  const supabase = getSupabase();
  if (!supabase) return {};

  try {
    const ip = await getClientIp();
    const databaseVisitorId = `ip:${ip}`;

    const { data, error } = await supabase
      .from("project_ratings")
      .select("project_key, score")
      .eq("visitor_id", databaseVisitorId);

    if (error || !data) return {};

    const result: Record<string, number> = {};
    for (const row of data) {
      result[row.project_key] = row.score;
    }
    return result;
  } catch (err) {
    console.error("Error fetching visitor ratings:", err);
    return {};
  }
}
