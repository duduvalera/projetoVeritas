import { supabaseInit } from "./supabase.js";
import sessionCheck from "./session.js";
import signIn from "./signin.js";
import logout from "./logout.js";
import { fetchPage } from "./fetchPage.js";
import statusMessage from "./statusMessage.js";

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
          statusMessage("Por favor, preencha a nova senha.", "alert");

          return;
        }

        if (!senhaAtual.length && novaSenha.length) {
          statusMessage("Por favor, preencha a senha atual.", "alert");

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
            statusMessage(
              `Erro ao atualizar o nome: ${errorUpdate.message}`,
              "error"
            );
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
            statusMessage(
              `Erro ao obter dados do usuário: ${erroUser.message}`,
              "error"
            );
            return;
          }

          const userEmail = userData.user.email;

          const { success, data, error } = await signIn(userEmail, senhaAtual);

          if (!success) {
            statusMessage("Erro ao fazer login.", "error");
            return;
          }

          const { error: errorUpdate } = await supabaseInit.auth.updateUser({
            password: novaSenha,
          });

          if (errorUpdate) {
            statusMessage(
              `Erro ao atualizar a senha: ${errorUpdate.message}`,
              "error"
            );
            return;
          }

          statusMessage("Senha atualizada com sucesso!", "success");

          const { success: successLogout, error: logoutError } = await logout();

          if (!successLogout) {
            statusMessage("Erro ao fazer logout.", "error");
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
            statusMessage(
              `Erro ao atualizar o nome: ${errorUpdateFName.message}`,
              "error"
            );
            return;
          }

          const { data: userData, error: erroGetUser } =
            await supabaseInit.auth.getUser();

          if (erroGetUser && !userData) {
            statusMessage(
              `Erro ao obter dados do usuário: ${erroGetUser.message}`,
              "error"
            );
            return;
          }

          const userEmail = userData.user.email;

          const { success, data, error } = await signIn(userEmail, senhaAtual);

          if (!success) {
            statusMessage("Erro ao fazer login.", "error");
            return;
          }

          const { error: errorUpdatePassword } =
            await supabaseInit.auth.updateUser({
              password: novaSenha,
            });

          if (errorUpdatePassword) {
            statusMessage(
              `Erro ao atualizar a senha: ${errorUpdatePassword.message}`,
              "error"
            );
            return;
          }

          statusMessage("Nome e senha atualizados com sucesso!", "success");

          const { success: successLogout, error: logoutError } = await logout();

          if (!successLogout) {
            statusMessage("Erro ao fazer logout.", "error");
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
