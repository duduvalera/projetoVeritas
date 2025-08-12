import initAnimaLogo from "./modules/animeHeader.js";
import initMenu from "./modules/menu.js";
import initAccordion from "./modules/accordion.js";
initMenu();
initAnimaLogo();
initAccordion();

if (window.location.pathname.includes("contato.html")) {
  const { default: initContatoForm } = await import("./modules/contato.js");
  initContatoForm();
}

if (window.location.pathname.includes("login.html")) {
  const { default: initLogin } = await import("./modules/login.js");
  initLogin();
}

if (window.location.pathname.includes("reset.html")) {
  const { default: initResetPassword } = await import("./modules/reset.js");
  initResetPassword();
}

if (window.location.pathname.includes("perfil.html")) {
  const { default: initPerfil } = await import("./modules/perfil.js");
  initPerfil();
}
