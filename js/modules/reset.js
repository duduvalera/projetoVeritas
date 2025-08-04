import { supabaseInit } from "./supabase.js";
import sessionCheck from "./session.js";

const containerFormResetPassword = `
  <div class="container-form-reset-password">
    <div class="form-conteudo">
      <label for="password">Nova senha</label>
      <input type="password" id="password" placeholder="Digite sua nova senha" required>
    </div>
    <button class="button" id="resetButton">Salvar</button>
  </div>
`;

export default async function initResetPassword() {
  const session = await sessionCheck();

  if (session) {
    document.getElementById(
      "status"
    ).textContent = `Usuário autenticado. Por gentileza, prossiga com a alteração de senha.`;

    document
      .getElementById("resetButton")
      .addEventListener("click", async function () {
        const password = document.getElementById("password").value;

        if (!password) {
          document.getElementById(
            "status"
          ).textContent = `Por favor, insira uma nova senha.`;
          return;
        }

        try {
          const { error } = await supabaseInit.auth.updateUser({
            password,
          });

          if (error) {
            document.getElementById(
              "status"
            ).textContent = `Erro ao atualizar a senha: ${error.message}`;
            return;
          }

          document.getElementById(
            "status"
          ).textContent = `Senha atualizada com sucesso!`;
        } catch (error) {
          document.getElementById(
            "status"
          ).textContent = `Erro ao atualizar a senha: ${error.message}`;
        }
      });
  } else {
    document
      .getElementsByClassName("container-form-reset-password")[0]
      .remove();
    document.getElementById(
      "status"
    ).textContent = `Token inválido ou expirado.`;
  }
}

initResetPassword();
