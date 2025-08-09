import initAnimaLogo from "./modules/animeHeader.js";
import initMenu from "./modules/menu.js";
import initContatoForm from "./modules/contato.js";
import initAccordion from "./modules/accordion.js";
import initLogin from "./modules/login.js";
import initResetPassword from "./modules/reset.js";
import initPerfil from "./modules/perfil.js";
initMenu();
initAnimaLogo();
initContatoForm();
initAccordion();

if (window.location.pathname.includes("login.html")) {
  initLogin();
}
if (window.location.pathname.includes("reset.html")) {
  initResetPassword();
}

if (window.location.pathname.includes("perfil.html")) {
  initPerfil();
}
