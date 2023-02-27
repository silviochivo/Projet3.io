//Login 

async function authentification () {
  const formulaireLogin = document.querySelector(".ConexionBox");
  
  const errorMessage = document.createElement('p');
  errorMessage.textContent = "Email ou Mdp incorrect. Veuillez réssayer";
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
      console.log(response.statusText); // Erreur Connetion 

      errorMessage.style.display = "block";
    }
  
  }catch (error) {
    console.log("Erreur conection User/login")

    errorMessage.style.display = "block";
  }
  
    });
  }
  
  authentification();


// Fonction qui crée le mode Administrateur 

  function editMode() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const header = document.querySelector('header');
    
    if (userData) {
      const divEditMode = document.createElement('div');
      divEditMode.classList.add('editMode');
      divEditMode.style.marginBottom = '30px';
      
      const p = document.createElement('p');
      p.textContent = 'mode édition';

      const icon = document.createElement('i');
      icon.classList.add('fa-regular', 'fa-pen-to-square');

      divEditMode.appendChild(icon);
      divEditMode.appendChild(p);

      let boutonEnregistrer = document.createElement('button');
      boutonEnregistrer.id = 'Boutton-Publier-Changements';
      boutonEnregistrer.textContent = 'publier les changements';

      const headerEditMode = document.querySelector('header');
      headerEditMode.style.marginTop = '0px';

      divEditMode.appendChild(p);
      divEditMode.appendChild(boutonEnregistrer);
      header.appendChild(divEditMode);
    }
  }

  if (window.location.pathname === "/index.html") {
    editMode();
  }


  