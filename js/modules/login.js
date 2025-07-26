import { signIn } from "./signIn.js";
import sessionCheck from "./session.js";
import logout from "./logout.js";

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
    <button class="button" onclick="signIn()">Entrar</button>
  </div>
`;

export default function initLogin() {
  sessionCheck(function (resp) {
    if (resp) {
      document.getElementsByClassName("container-form-login")[0].remove();
      const elementoBotaoLogout = document.createElement("button");
      elementoBotaoLogout.className = "button";
      elementoBotaoLogout.textContent = "Sair";

      elementoBotaoLogout.addEventListener("click", async function () {
        await logout();
      });

      document.getElementById(
        "status"
      ).textContent = `Bem-vindo, ${resp.user.email}!`;
      document.querySelector(".main").appendChild(elementoBotaoLogout);
    } else {
      document.querySelector("#login-button") &&
        document
          .querySelector("#login-button")
          .addEventListener("click", async function () {
            await signIn();
          });
    }
  });
}

initLogin();
