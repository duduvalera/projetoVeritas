import signIn from "./signin.js";
import sessionCheck from "./session.js";
import sendResetLink from "./sendResetLink.js";
import { fetchPage } from "./fetchPage.js";

const containerFormLogin = `
  <div class="container-form-login">
    <div class="form-conteudo">
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="Email">
    </div>
    <div class="form-conteudo">
      <label for="password">Senha</label>
      <input type="password" id="password" placeholder="Senha">
    </div>
    <button class="button" id="loginButton">Entrar</button>
    <a id="resetPassword" href="#">Esqueci minha senha</a>
  </div>
`;

export default async function initLogin() {
  const session = await sessionCheck();

  if (!session) {
    document.getElementById("login-button") &&
      document
        .getElementById("login-button")
        .addEventListener("click", async function () {
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          const { success, data, error } = await signIn(email, password);

          if (!success) {
            document.getElementById(
              "status"
            ).textContent = `Usuário ou senha inválidos. Tente novamente.`;
            return;
          }

          fetchPage("index.html");
          window.history.pushState(null, null, "index.html");
        });

    document.querySelector("#resetPassword") &&
      document
        .querySelector("#resetPassword")
        .addEventListener("click", async function (event) {
          event.preventDefault();
          const email = document.getElementById("email").value;

          if (!email) {
            document.getElementById(
              "status"
            ).textContent = `Por favor, insira seu e-mail.`;
            return;
          }

          const { success, data, error } = await sendResetLink(email);

          if (!success) {
            document.getElementById(
              "status"
            ).textContent = `Erro ou enviar email. Consulte o administrador ou tente novamente.`;
            return;
          }

          document.getElementById(
            "status"
          ).textContent = `Link de redefinição enviado. Verifique sua caixa de entrada.`;
        });

    return;
  }

  fetchPage("index.html");
  window.history.pushState(null, null, "index.html");
}
