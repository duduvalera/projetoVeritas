import { supabaseInit } from "./signIn.js";

import sessionCheck from "./session.js";

export default async function logout() {
  try {
    const { error } = await supabaseInit.auth.signOut();

    if (!error) {
      window.location.reload();
      return;
    }

    document.getElementById(
      "status"
    ).textContent = `Erro ao sair: ${error.message}`;
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
  }
}
