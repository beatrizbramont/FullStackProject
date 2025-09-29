document.getElementById("form-login").addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha }),
      credentials: "include"
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login realizado com sucesso!");
      console.log(data.usuario);
    } else {
      alert(data.error || "Erro ao fazer login.");
    }

  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro de conexão com o servidor.");
  }
});
