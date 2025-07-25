import initLogin from "./login.js";
export default function initFetchPage() {
  const links = document.querySelectorAll("a");

  function handleClick(event) {
    event.preventDefault();
    fetchPage(event.target.href);
    window.history.pushState(null, null, event.target.href);
  }

  async function fetchPage(url) {
    const pageResponse = await fetch(url);
    const pageText = await pageResponse.text();
    replaceContent(pageText);
    if (url.includes("login.html")) {
      initLogin();
    }
  }

  function replaceContent(newText) {
    const newHtml = document.createElement("div");
    newHtml.innerHTML = newText;
    const oldContent = document.querySelector(".main");
    const newContent = newHtml.querySelector(".main");

    oldContent.innerHTML = newContent.innerHTML;
  }
  window.addEventListener("popstate", () => {
    fetchPage(window.location.href);
  });
  links.forEach((link) => {
    link.addEventListener("click", handleClick);
  });
}
