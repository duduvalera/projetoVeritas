import initLogin from "./login.js";
import initResetPassword from "./reset.js";
export default function initFetchPage() {
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
    link.addEventListener("click", handleClick);
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
  if (url.includes("login.html")) {
    initLogin();
  } else if (url.includes("reset.html")) {
    initResetPassword();
  }
}
