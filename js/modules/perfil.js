import { supabaseInit } from "./supabase.js";
import sessionCheck from "./session.js";
import signIn from "./signin.js";
import logout from "./logout.js";
import { fetchPage } from "./fetchPage.js";

export default async function initPerfil() {
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

        const nome = document.getElementById("nome").value;
        const senhaAtual = document.getElementById("senha-atual").value;
        const novaSenha = document.getElementById("nova-senha").value;

        if (senhaAtual.length && !novaSenha.length) {
          console.log("Por favor, preencha a nova senha.");
          return;
        }

        if (!senhaAtual.length && novaSenha.length) {
          console.log("Por favor, preencha a senha atual.");
          return;
        }

        if (
          nome.length &&
          nome !== userProfileInfo.data.full_name &&
          !senhaAtual.length &&
          !novaSenha.length
        ) {
          const { error: errorUpdate } = await supabaseInit
            .from("profiles")
            .update({ full_name: nome })
            .eq("id", session.user.id);

          if (errorUpdate) {
            console.error("Erro ao atualizar o nome:", errorUpdate);
            return;
          }

          fetchPage("perfil.html");
          window.history.pushState(null, null, "perfil.html");
          return;
        }

        if (
          nome.length &&
          nome === userProfileInfo.data.full_name &&
          senhaAtual.length &&
          novaSenha.length
        ) {
          const { data: userData, error: erroUser } =
            await supabaseInit.auth.getUser();

          if (erroUser && !userData) {
            console.error("Erro ao obter dados do usuário:", erroUser);
            return;
          }

          const userEmail = userData.user.email;

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

          fetchPage("login.html");
          window.history.pushState(null, null, "login.html");
          return;
        }

        if (
          nome.length &&
          nome !== userProfileInfo.data.full_name &&
          senhaAtual.length &&
          novaSenha.length
        ) {
          const { error: errorUpdateFName } = await supabaseInit
            .from("profiles")
            .update({ full_name: nome })
            .eq("id", session.user.id);

          if (errorUpdateFName) {
            console.error("Erro ao atualizar o nome:", errorUpdateFName);
            return;
          }

          const { data: userData, error: erroGetUser } =
            await supabaseInit.auth.getUser();

          if (erroGetUser && !userData) {
            console.error("Erro ao obter dados do usuário:", erroGetUser);
            return;
          }

          const userEmail = userData.user.email;

          const { success, data, error } = await signIn(userEmail, senhaAtual);

          if (!success) {
            console.log("Erro ao fazer login");
            return;
          }

          const { error: errorUpdatePassword } =
            await supabaseInit.auth.updateUser({
              password: novaSenha,
            });

          if (errorUpdatePassword) {
            document.getElementById(
              "status"
            ).textContent = `Erro ao atualizar a senha: ${error.message}`;
            return;
          }

          console.log("Senha e nome de usuário atualizada com sucesso!");

          const { success: successLogout, error: logoutError } = await logout();

          if (!successLogout) {
            console.log("Erro ao fazer logout");
            return;
          }

          fetchPage("login.html");
          window.history.pushState(null, null, "login.html");
          return;
        }
      });
  } else {
    fetchPage("login.html");
    window.history.pushState(null, null, "login.html");
  }
}
