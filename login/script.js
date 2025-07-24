// Substitua com suas credenciais do Supabase
const supabaseUrl = "https://dgkrkuaqxbqgcomyxcuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna3JrdWFxeGJxZ2NvbXl4Y3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzEzMTcsImV4cCI6MjA2ODgwNzMxN30.M7_8gucmbSSPCU8QmgsGEXq_Ve5NXNRG2nWQEfKUzHc";
const supabaseInit = supabase.createClient(supabaseUrl, supabaseKey);

const containerFormLogin = `
  <div class="container-form-login">
    <div class="form-conteudo">
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="Email">
    </div>
    <div class="form-conteudo">
      <label for="password">Senha</label>
      <input type="password" id="password" placeholder="Senha">
    </div>
    <button class="button" onclick="signIn()">Entrar</button>
  </div>
`;

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const dataResponse = await supabaseInit.auth.signInWithPassword({
      email,
      password,
    });

    sessionCheck();
  } catch (error) {
    document.getElementById(
      "status"
    ).textContent = `Usuário ou senha inválidos. Tente novamente.`;
  }
}

const sessionCheck = async () => {
  try {
    const {
      data: { session },
    } = await supabaseInit.auth.getSession();

    if (session) {
      console.log("Usuário logado:", session.user.email);
      document.getElementsByClassName("container-form-login")[0].remove();
      document.getElementById(
        "status"
      ).textContent = `Bem-vindo, ${session.user.email}!`;

      const elementoBotaoLogout = document.createElement("button");
      elementoBotaoLogout.className = "button";
      elementoBotaoLogout.textContent = "Sair";

      document.querySelector(".main").appendChild(elementoBotaoLogout);

      elementoBotaoLogout.addEventListener("click", async () => {
        try {
          const { error } = await supabaseInit.auth.signOut();

          if (!error) {
            window.location.reload();
            elementoBotaoLogout.remove();
            sessionCheck();
            return;
          }

          document.getElementById(
            "status"
          ).textContent = `Erro ao sair: ${error.message}`;
        } catch (error) {
          console.error("Erro ao realizar logout:", error);
        }
      });

      return;
    }
    // redirecionar ou esconder conteúdo
    console.log("Usuário não está logado");
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
  }
};

sessionCheck();
