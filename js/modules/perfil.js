import { supabaseInit } from "./supabase.js";
import sessionCheck from "./session.js";
import signIn from "./signin.js";
import logout from "./logout.js";
import { fetchPage } from "./fetchPage.js";

export default async function initPerfil() {
  console.log("Iniciou a tela de perfil");

  const session = await sessionCheck();

  if (session && session.user) {
    const userProfileInfo = await supabaseInit
      .from("profiles")
      .select("full_name")
      .eq("id", session.user.id)
      .single();

    document.getElementById("nome").value = userProfileInfo.data.full_name;

    document.getElementById("email").value = session.user.email;

    document
      .getElementById("perfil-formulario")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const senhaAtual = document.getElementById("senha-atual").value;
        const novaSenha = document.getElementById("nova-senha").value;

        const { data: userData, error: erroUser } =
          await supabaseInit.auth.getUser();

        if (erroUser && !userData) {
          console.error("Erro ao obter dados do usuário:", erroUser);
          return;
        }

        const userEmail = userData.user.email;

        console.log(userEmail);

        const { success, data, error } = await signIn(userEmail, senhaAtual);

        if (!success) {
          console.log("Erro ao fazer login");
          return;
        }

        const { error: errorUpdate } = await supabaseInit.auth.updateUser({
          password: novaSenha,
        });

        if (errorUpdate) {
          document.getElementById(
            "status"
          ).textContent = `Erro ao atualizar a senha: ${error.message}`;
          return;
        }

        console.log("Senha atualizada com sucesso!");

        const { success: successLogout, error: logoutError } = await logout();

        if (!successLogout) {
          console.log("Erro ao fazer logout");
          return;
        }

        console.log("Usuário desconectado com sucesso!");

        setTimeout(() => {
          fetchPage("login.html");
          window.history.pushState(null, null, "login.html");
        }, 2000);
      });
  } else {
    fetchPage("login.html");
    window.history.pushState(null, null, "login.html");
  }
}

initPerfil();
