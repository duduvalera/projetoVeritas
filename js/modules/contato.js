export default function initContatoForm() {
  // Adiciona a biblioteca do EmailJS ao head do documento
  // para garantir que ela seja carregada antes de ser usada.
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  document.head.appendChild(script);

  script.onload = () => {
    // Inicializa o EmailJS com a sua Public Key
    // Você encontra a Public Key na sua conta do EmailJS em Account -> API Keys
    emailjs.init({
      publicKey: "GfZeLCD1xTFGA35Lr", // Substitua pela sua Public Key
    });

    const contactForm = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");
    const sendButton = document.querySelector(".campos-contato .button");

    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Muda o texto do botão para "Enviando..." e o desabilita
        const originalButtonText = sendButton.textContent;
        sendButton.textContent = "Enviando...";
        sendButton.disabled = true;

        // Limpa mensagens de status anteriores
        statusMessage.innerHTML = "";
        statusMessage.className = "status-message";

        // Parâmetros do EmailJS
        const serviceID = "service_oepho6f"; // Substitua pelo seu Service ID
        const templateID = "template_qgi8094"; // Substitua pelo seu Template ID

        emailjs.sendForm(serviceID, templateID, this).then(
          () => {
            // Sucesso no envio
            sendButton.textContent = originalButtonText; // Restaura o texto do botão
            sendButton.disabled = false;
            statusMessage.innerHTML = "Mensagem enviada com sucesso!";
            statusMessage.className = "status-message success"; // Adiciona classe de sucesso
            contactForm.reset(); // Limpa os campos do formulário
          },
          (err) => {
            // Erro no envio
            sendButton.textContent = originalButtonText; // Restaura o texto do botão
            sendButton.disabled = false;
            statusMessage.innerHTML = `Ocorreu um erro: ${
              err.text || JSON.stringify(err)
            }`;
            statusMessage.className = "status-message error"; // Adiciona classe de erro
          }
        );
      });
    }
  };
}
