import { supabaseInit } from "./supabase.js";

export default async function signIn(email, password) {
  try {
    const { data, error } = await supabaseInit.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error };
  }
}
