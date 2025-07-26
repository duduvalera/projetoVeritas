export default function initAnimaLogo() {
  const logo = document.querySelector(".logo-veritas .imagem-logo");

  function aumentarLogo() {
    logo.classList.add("ativo");
  }
  window.addEventListener("load", aumentarLogo);
}
