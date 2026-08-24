import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Only create Supabase client if URL and Anon key are configured
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Inserts a visitor log record into the Supabase 'visitors' table
 */
export async function insertVisitorLog(visitorData) {
  if (!supabase) {
    console.log("Supabase client not configured yet. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env");
    return { success: false, reason: "Supabase credentials missing" };
  }

  try {
    const { data, error } = await supabase.from("visitors").insert([
      {
        location: visitorData.location,
        ip_address: visitorData.ip,
        device: visitorData.device,
        page_url: visitorData.page_url,
        referrer: visitorData.referrer,
        user_agent: visitorData.user_agent,
      },
    ]);

    if (error) {
      console.warn("Supabase DB Insert Error:", error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn("Supabase Exception:", err);
    return { success: false, err };
  }
}
