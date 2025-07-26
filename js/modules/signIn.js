// Substitua com suas credenciais do Supabase
const supabaseUrl = "https://dgkrkuaqxbqgcomyxcuk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna3JrdWFxeGJxZ2NvbXl4Y3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzEzMTcsImV4cCI6MjA2ODgwNzMxN30.M7_8gucmbSSPCU8QmgsGEXq_Ve5NXNRG2nWQEfKUzHc";
export const supabaseInit = supabase.createClient(supabaseUrl, supabaseKey);

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

import sessionCheck from "./session.js";
import logout from "./logout.js";

export async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data, error } = await supabaseInit.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    document.getElementById(
      "status"
    ).textContent = `Bem-vindo, ${data.user.email}!`;

    sessionCheck(function (resp) {
      if (resp) {
        const elementoBotaoLogout = document.createElement("button");
        elementoBotaoLogout.className = "button";
        elementoBotaoLogout.textContent = "Sair";

        elementoBotaoLogout.addEventListener("click", async function () {
          await logout();
        });

        document.getElementsByClassName("container-form-login")[0].remove();
        document.querySelector(".main").appendChild(elementoBotaoLogout);
      }
    });
  } catch (error) {
    document.getElementById(
      "status"
    ).textContent = `Usuário ou senha inválidos. Tente novamente.`;
  }
}
