export default function statusMessage(
  message = "Mensagem padrão",
  type = "info"
) {
  console.log("Status Message:", message, type);
  const statusContainer = document.getElementById("status-container");
  if (!statusContainer) return;

  const statusElement = statusContainer.querySelector(".status");
  if (!statusElement) {
    statusElement = document.createElement("div");
    statusElement.classList.add("status");
    statusContainer.appendChild(statusElement);
  }

  const statusMessageSpan = statusElement.querySelector(".status-message");
  if (!statusMessageSpan) {
    statusMessageSpan = document.createElement("span");
    statusMessageSpan.classList.add("status-message");
    statusElement.appendChild(statusMessageSpan);
  }

  statusMessageSpan.textContent = message;

  statusElement.className = "status"; // Reset classes
  statusElement.classList.add("status");

  statusElement.classList.add(`status-${type}`);

  // Mostrar a mensagem
  statusElement.style.display = "block";

  statusContainer.scrollIntoView({ behavior: "smooth", block: "center" });

  // Ocultar a mensagem após 5 segundos
  setTimeout(() => {
    statusElement.style.display = "none";
  }, 5000);
}
