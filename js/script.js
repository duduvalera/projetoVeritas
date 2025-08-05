import initFetchPage from "./modules/fetchPage.js";
import initAnimaLogo from "./modules/animeHeader.js";
import initContatoForm from "./modules/contato.js";
import initAccordion from "./modules/accordion.js";
import initLogin from "./modules/login.js";
import initResetPassword from "./modules/reset.js";
initFetchPage();
initAnimaLogo();
initContatoForm();
initAccordion();

if (window.location.pathname.includes("login.html")) {
  initLogin();
}
if (window.location.pathname.includes("reset.html")) {
  initResetPassword();
}
