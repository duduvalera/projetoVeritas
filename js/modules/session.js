import { supabaseInit } from "./supabase.js";

export default async function sessionCheck() {
  try {
    const {
      data: { session },
    } = await supabaseInit.auth.getSession();

    return session;
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
  }
}
