import { supabaseInit } from "./signIn.js";

export default async function sessionCheck(callback) {
  try {
    const {
      data: { session },
    } = await supabaseInit.auth.getSession();

    if (session) {
      callback(session);
      return;
    }
    callback(null);
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
  }
}
