"use server";

import { createClient } from "@supabase/supabase-js";

/**
 * Lazily create the Supabase client.
 * At build time the env vars may not exist, so we must not create
 * the client at module scope.
 */
function getSupabase() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export async function submitContactForm(formData: FormData) {
  // Extract fields
  const botcheck = formData.get("botcheck");
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("project_type") as string;
  const message = formData.get("message") as string;

  // Honeypot check
  if (botcheck) {
    return { success: false, message: "Bot detected. Request denied." };
  }

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase environment variables are missing.");
    return { 
      success: false, 
      message: "The server is not configured to receive messages yet. Please try again later." 
    };
  }

  try {
    // Insert into Supabase
    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          service_type: projectType || null,
          message,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return {
        success: false,
        message: "The owl couldn't take off. Please try again or write to me directly.",
      };
    }

    return {
      success: true,
      message: "Owl dispatched — your letter is on its way. I read every one.",
    };
  } catch (err) {
    console.error("Server Action Error:", err);
    return {
      success: false,
      message: "An unexpected error occurred. The owl couldn't take off.",
    };
  }
}
