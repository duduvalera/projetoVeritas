import { supabaseInit } from "./supabase.js";

export default async function sendResetLink(email) {
  try {
    const { data, error } = await supabaseInit.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "http://127.0.0.1:5500/reset.html",
      }
    );

    if (error) {
      return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error };
  }
}
