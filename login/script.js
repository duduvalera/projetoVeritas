// Substitua com suas credenciais do Supabase
const supabaseUrl = "https://dgkrkuaqxbqgcomyxcuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna3JrdWFxeGJxZ2NvbXl4Y3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzEzMTcsImV4cCI6MjA2ODgwNzMxN30.M7_8gucmbSSPCU8QmgsGEXq_Ve5NXNRG2nWQEfKUzHc";
const supabaseInit = supabase.createClient(supabaseUrl, supabaseKey);

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const dataResponse = await supabaseInit.auth.signInWithPassword({
      email,
      password,
    });

    document.getElementById(
      "status"
    ).textContent = `Bem-vindo, ${dataResponse.data.user.email}!`;
  } catch (error) {
    document.getElementById(
      "status"
    ).textContent = `Usuário ou senha inválidos. Tente novamente.`;
  }
}

const sessionCheck = async () => {
  const elementoBotaoLogout = document.createElement("button");
  const {
    data: { session },
  } = await supabaseInit.auth.getSession();

  try {
    if (!session) {
      // redirecionar ou esconder conteúdo
      console.log("Usuário não está logado");
    } else {
      console.log("Usuário logado:", session.user.email);

      elementoBotaoLogout.textContent = "Sair";

      document.querySelector(".main").appendChild(elementoBotaoLogout);
    }
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
  }

  elementoBotaoLogout.addEventListener("click", async () => {
    try {
      const { error } = await supabaseInit.auth.signOut();

      if (error) {
        document.getElementById(
          "status"
        ).textContent = `Erro ao sair: ${error.message}`;
      } else {
        document.getElementById("status").textContent =
          "Logout realizado com sucesso!";
        elementoBotaoLogout.remove();
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  });
};

sessionCheck();
