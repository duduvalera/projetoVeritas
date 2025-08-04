import signIn from "./signin.js";
import sessionCheck from "./session.js";
import logout from "./logout.js";
import sendResetLink from "./sendResetLink.js";

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

  if (session) {
    document.getElementsByClassName("container-form-login").length &&
      document.getElementsByClassName("container-form-login")[0].remove();
    const elementoBotaoLogout = document.createElement("button");
    elementoBotaoLogout.className = "button";
    elementoBotaoLogout.textContent = "Sair";

    elementoBotaoLogout.addEventListener("click", async function () {
      const { success, error } = await logout();

      if (!success) {
        document.getElementById(
          "status"
        ).textContent = `Erro ao sair: ${error}`;
        return;
      }

      window.location.reload();
    });

    document.getElementById(
      "status"
    ).textContent = `Bem-vindo, ${session.user.email}!`;
    document.querySelector(".main").appendChild(elementoBotaoLogout);
  } else {
    document.getElementById("loginButton") &&
      document
        .getElementById("loginButton")
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

          document.getElementById(
            "status"
          ).textContent = `Bem-vindo, ${data.user.email}!`;

          const elementoBotaoLogout = document.createElement("button");
          elementoBotaoLogout.className = "button";
          elementoBotaoLogout.textContent = "Sair";

          document.getElementsByClassName("container-form-login")[0].remove();

          elementoBotaoLogout.addEventListener("click", async function () {
            const { success, error } = await logout();

            if (!success) {
              document.getElementById(
                "status"
              ).textContent = `Erro ao sair: ${error}`;
              return;
            }

            window.location.reload();
          });

          document.querySelector(".main").appendChild(elementoBotaoLogout);
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
  }
}
