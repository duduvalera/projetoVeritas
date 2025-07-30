export default function initAccordion() {
  const accordionList = document.querySelectorAll(".js-accordion dt");
  const ativarClasse = "ativo";

  if (accordionList.length) {
    accordionList[0].classList.add(ativarClasse);
    accordionList[0].nextElementSibling.classList.add(ativarClasse);

    function activeAccordion() {
      this.classList.toggle(ativarClasse);
      this.nextElementSibling.classList.toggle(ativarClasse);
    }

    accordionList.forEach((item) => {
      item.addEventListener("click", activeAccordion);
    });
  }
}
