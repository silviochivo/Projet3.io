//Login 

async function authentification () {
  const formulaireLogin = document.querySelector(".ConexionBox");
  
  const errorMessage = document.createElement('p');
  errorMessage.textContent = "Email ou Mot de passe incorrect. Veuillez réssayer";
  errorMessage.style.color = "red";
  errorMessage.classList = "messageErreur"
  errorMessage.style.display ="none"
  // insérer le message d'erreur entre le h2 et le p
  formulaireLogin.insertBefore(errorMessage, formulaireLogin.children[1]); 

  
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

        editMode()

    }else {
      //Erreur Identifiant ou Mot de Passe
      console.log(error)
      console.log(response.statusText); // Erreur Mot de passe 

      errorMessage.style.display = "block";
    }
  
  }catch (error) {
    console.log("Erreur Email / Mot de Passe")

    errorMessage.style.display = "block";
  }
  
    });
}
  
authentification();


// Fonction qui crée le mode Administrateur 

function editMode() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const header = document.querySelector('header');
  const divHeader =document.querySelector('.divHeader');
  const logoutButton = document.getElementById("Logout");
  const loginButton = document.getElementById("Login");
  const cacherFiltres = document.querySelector('.Bouton-Filter');
  const divEditMode = document.querySelector('.editMode');
  const modaleIcon = document.getElementById("Modale");
  const modifierImage = document.querySelector('.Modifier-Image');
  const lienModale = document.querySelector('.Lien-Open-Modale');
    
  if (userData) {

    header.style.marginTop = "0px"
    divEditMode.style.visibility = "visible";
    divHeader.style.marginTop = "90px"
    modaleIcon.style.display = "block";
    lienModale.style.display = "block";
    modifierImage.style.visibility = "visible";

    logoutButton.style.display = "block";
    logoutButton.style.marginLeft = "-20px";
    logoutButton.style.marginRight = "-10px";
    loginButton.innerHTML = "";

    cacherFiltres.style.marginTop = "0px";
    cacherFiltres.innerHTML = "";
    
    const logout = LogoutSession();
    
    if (logout) {
      divHeader.appendChild(logout);
    }
  } else {
    logoutButton.style.display = 'none';
    loginButton.style.display = 'block';
  }
  
}

if (window.location.pathname === "/index.html") {
  editMode();
}


// Fonction qui crée le bouton de déconnexion
function LogoutSession() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  if (userData) {
    logoutButton.addEventListener('click', function() {
      sessionStorage.clear();
      window.location.reload();
    });

  }
}

    