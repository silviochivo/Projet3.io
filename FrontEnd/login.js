//Login 

async function authentification () {
    const formulaireLogin = document.querySelector(".ConexionBox");
    formulaireLogin.addEventListener("submit", async function(event){
    event.preventDefault();
  
    let login = {
      email : document.getElementById("email").value,
      password : document.getElementById("password").value,
    };
  
    try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(login)
    });
  
    if (response.ok) {
        console.log("ConnectionAccepté")
        //Sauvegarde des donnés de conection dans un Session Storage
        const dataSession = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(dataSession));
        // Rediriger vers la page de Modification
        window.location.href = "index.html";
  
    }else {
      //Erreur Identifiant ou Mot de Passe
      console.log(error)
      console.log(response.statusText); // Erreur Connetion 
      
    }
  
  }catch (error) {
    console.log("Erreur conection API")
  }
  
    });
  }
  
  authentification();