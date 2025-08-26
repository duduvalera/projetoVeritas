export default function statusMessage(mensagem, tipo = "info") {
  const statusContainer = document.querySelector(".container-status");
  if (!statusContainer) return;

  let statusElement = statusContainer.querySelector(".status");
  if (!statusElement) {
    statusElement = document.createElement("div");
    statusElement.classList.add("status");
    statusContainer.appendChild(statusElement);
  }

  statusElement.textContent = mensagem;
  statusElement.className = "status"; // Reset classes
  statusElement.classList.add("status");

  if (tipo === "erro") {
    statusElement.classList.add("status-erro");
  } else if (tipo === "sucesso") {
    statusElement.classList.add("status-sucesso");
  } else {
    statusElement.classList.add("status-info");
  }

  // Mostrar a mensagem
  statusElement.style.display = "block";

  // Ocultar a mensagem após 5 segundos
  setTimeout(() => {
    statusElement.style.display = "none";
  }, 5000);
}
