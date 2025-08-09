import sessionCheck from "./session.js";
import logout from "./logout.js";
import { fetchPage, initFetchPage } from "./fetchPage.js";

export default async function initMenu() {
  const elementPerfil = `
    <li class="dropdown">
      <div id="foto-preview-nav" class="perfil-foto-preview"></div>
      <div class="dropdown-content">
        <a linkFetch href="./perfil.html">Configurações</a>
        <a id="logoutButton" linkLogout href="#">Sair</a>
      </div>
    </li>
  `;

  const elementLogin = `
    <li id="">
      <a linkFetch href="./login.html">Login</a>
    </li>
  `;
  const session = await sessionCheck();

  if (session) {
    document.querySelector('a[href="./login.html"]') &&
      document.querySelector('a[href="./login.html"]').parentElement.remove();
    document.querySelector(".header-menu > .menu-lista") &&
      !document.querySelector(".header-menu > .menu-lista > .dropdown") &&
      document
        .querySelector(".header-menu > .menu-lista")
        .insertAdjacentHTML("beforeend", elementPerfil);

    function handleLogout() {
      document.querySelector("a[linkLogout]") &&
        document
          .querySelector("a[linkLogout]")
          .addEventListener("click", async function (event) {
            event.preventDefault();
            const { success, error } = await logout();

            if (!success) {
              console.error("Erro ao sair:", error);
              return;
            }

            fetchPage("./login.html");
            window.history.pushState(null, null, "login.html");
          });
    }

    handleLogout();
    initFetchPage();
    return;
  }

  document.getElementById("foto-preview-nav") &&
    document.getElementById("foto-preview-nav").parentElement.remove();

  !document.querySelector("a[href='./login.html']") &&
    document
      .querySelector(".header-menu > .menu-lista")
      .insertAdjacentHTML("beforeend", elementLogin);

  initFetchPage();
}
