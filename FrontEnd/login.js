//Login 
if (window.location.href.endsWith("login.html")) {
  async function authentification () {
    const formulaireLogin = document.querySelector(".ConexionBox");
    const errorMessage = document.querySelector('.Message-Erreur');
    errorMessage.style.color = 'red';
    
    
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
};

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
  const logoutButton = document.getElementById("Logout");

  if (userData) {
    logoutButton.addEventListener('click', function() {
      sessionStorage.clear();
      clearEditMode();
      console.log('session fermée')
      window.location.reload();
    });

  }
}

//Fonction qui renitialise le mode administrateur 

function clearEditMode() {
  const header = document.querySelector('header');
  const divHeader = document.querySelector('.divHeader');
  const logoutButton = document.getElementById("Logout");
  const loginButton = document.getElementById("Login");
  const cacherFiltres = document.querySelector('.Bouton-Filter');
  const divEditMode = document.querySelector('.editMode');
  const modaleIcon = document.getElementById("Modale");
  const modifierImage = document.querySelector('.Modifier-Image');
  const lienModale = document.querySelector('.Lien-Open-Modale');

  header.style.marginTop = "";
  divEditMode.style.visibility = 'hidden';
  divHeader.style.marginTop = "";
  modaleIcon.style.display = 'none';
  lienModale.style.display = 'none';
  modifierImage.style.visibility = 'hidden';

  logoutButton.style.display = "";
  logoutButton.style.marginLeft = "";
  logoutButton.style.marginRight = "";

  cacherFiltres.style.marginTop = "";
}


//fonction des bouttons Filtres 
if (window.location.href.endsWith("index.html") && !userDataCheck) {

  const tousButton = document.getElementById("Boutton-Filter-Tous");
  const objetsButton = document.getElementById("Boutton-Filter-Objets");
  const appartementsButton = document.getElementById("Boutton-Filter-Appartements");
  const hotelsEtRestaurantsButton = document.getElementById("Boutton-Filter-Hotels-Et-Restaurants");

  tousButton.style.backgroundColor = "#1D6154" ;
  tousButton.style.color = "white" ;

  tousButton.addEventListener("click", function() {
    tousButton.style.backgroundColor = "#1D6154" ;
    tousButton.style.color = "white" ;
    objetsButton.style.backgroundColor = "white";
    objetsButton.style.color = "#1D6154";
    appartementsButton.style.backgroundColor = "white";
    appartementsButton.style.color = "#1D6154";
    hotelsEtRestaurantsButton.style.backgroundColor = "white";
    hotelsEtRestaurantsButton.style.color = "#1D6154";
  });

  objetsButton.addEventListener("click", function() {
    objetsButton.style.backgroundColor = "#1D6154";
    objetsButton.style.color = "white";
    appartementsButton.style.backgroundColor = "white";
    appartementsButton.style.color = "#1D6154";
    hotelsEtRestaurantsButton.style.backgroundColor = "white";
    hotelsEtRestaurantsButton.style.color = "#1D6154";
    tousButton.style.backgroundColor = "white" ;
    tousButton.style.color = "#1D6154" ;
  });

  appartementsButton.addEventListener("click", function() {
    objetsButton.style.backgroundColor = "white";
    objetsButton.style.color = "#1D6154";
    appartementsButton.style.backgroundColor = "#1D6154";
    appartementsButton.style.color = "white";
    hotelsEtRestaurantsButton.style.backgroundColor = "white";
    hotelsEtRestaurantsButton.style.color = "#1D6154";
    tousButton.style.backgroundColor = "white" ;
    tousButton.style.color = "#1D6154" ;
  });

  hotelsEtRestaurantsButton.addEventListener("click", function() {
    objetsButton.style.backgroundColor = "white";
    objetsButton.style.color = "#1D6154";
    appartementsButton.style.backgroundColor = "white";
    appartementsButton.style.color = "#1D6154";
    hotelsEtRestaurantsButton.style.backgroundColor = "#1D6154";
    hotelsEtRestaurantsButton.style.color = "white";
    tousButton.style.backgroundColor = "white" ;
    tousButton.style.color = "#1D6154" ;
  });
}
