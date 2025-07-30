import { supabaseInit } from "./supabase.js";

export default async function logout() {
  try {
    const { error } = await supabaseInit.auth.signOut();

    if (error) {
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}
