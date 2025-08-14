import initMenu from "./menu.js";

export function initFetchPage() {
  const links = document.querySelectorAll("a[linkFetch]");

  function handleClick(event) {
    event.preventDefault();
    fetchPage(event.target.href);
    window.history.pushState(null, null, event.target.href);
  }

  window.addEventListener("popstate", () => {
    fetchPage(window.location.href);
  });
  links.forEach((link) => {
    if (!link.hasAttribute("data-event-click")) {
      link.addEventListener("click", handleClick);
      link.setAttribute("data-event-click", "true");
    }
  });
}

export function replaceContent(newText) {
  const newHtml = document.createElement("div");
  newHtml.innerHTML = newText;
  const oldContent = document.querySelector(".main");
  const newContent = newHtml.querySelector(".main");

  oldContent.innerHTML = newContent.innerHTML;
}

export async function fetchPage(url) {
  const pageResponse = await fetch(url);
  const pageText = await pageResponse.text();
  replaceContent(pageText);
  initMenu();
  if (url.includes("contato.html")) {
    const { default: initContatoForm } = await import("./contato.js");
    initContatoForm();
  }

  if (url.includes("login.html")) {
    const { default: initLogin } = await import("./login.js");
    initLogin();
  }

  if (url.includes("reset.html")) {
    const { default: initResetPassword } = await import("./reset.js");
    initResetPassword();
  }

  if (url.includes("perfil.html")) {
    const { default: initPerfil } = await import("./perfil.js");
    initPerfil();
  }
}
