
function openBoiteModale() {
    const Modale = document.getElementById('openModale');

    Modale.style.display = 'flex';
    Modale.setAttribute('aria-hidden', 'false');
    Modale.removeAttribute('aria-hidden');
    
    window.addEventListener('click', outsideClick);

    loadProjectsModale()
    createPage2Modale ()
}
    

function closeBoiteModale() {
    const Modale = document.getElementById('openModale');
    Modale.style.display = 'none';
    Modale.setAttribute('aria-hidden', 'true');
    
    window.removeEventListener('click', outsideClick);

    removeItemsModale ()
    closepage2Modale () 
}
    

function outsideClick(event) {
    const Modale = document.getElementById('openModale');
    if (event.target == Modale) {
        closeBoiteModale();
    }
}
    

document.addEventListener('DOMContentLoaded', function() {
    const openModaleLink = document.querySelector('.Lien-Open-Modale');
    const closeButtonLink = document.querySelector('.Close-Modale-1');
    
    openModaleLink.addEventListener('click', function(event) {
        event.preventDefault();
        openBoiteModale();
    });
    

    closeButtonLink.addEventListener('click', function(event) {
        event.preventDefault();
        closeBoiteModale();
    });
});




//Function Load Projects sur la modale
function loadProjectsModale() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
  
    if (userData) {

        async function loadProjects2() {
            let response = await fetch("http://localhost:5678/api/works");
        
            console.log(response.status); // 200
            console.log(response.statusText); // OK
        
            if (response.status === 200) {
                let works = await response.json();
                console.log(works);

                let divGalerieModale = document.querySelector('.galeriePhotoModale');
                let divImagesModale = document.createElement("div")
                divImagesModale.classList.add("Images-Modale");
                
                for(let i = 0; i < works.length; i++) {
        
                    let boxWork = works[i];
                    const workIdentification = works.map(projets => projets.id);
                    let WorkId = workIdentification[i];
                    let figureElement = document.createElement("figure");
                    figureElement.style.position = 'relative';
                    
                    let imageElement = document.createElement("img");
                    imageElement.src = works[i].imageUrl
                    imageElement.alt = works[i].title
                    imageElement.style.width = '100%'
                    imageElement.style.position = 'relative';

                    let editImage = document.createElement("figcaption");
                    editImage.innerText = 'éditer'
                    editImage.href = '#'

                    let iconsDiv = document.createElement("div");
                    iconsDiv.classList.add("divIcon");
                    iconsDiv.style.position = 'absolute';

                    let arrowIcon = document.createElement("a");
                    arrowIcon.classList.add("ArrowIcon");
                    arrowIcon.style.display = 'none';
                    arrowIcon.innerHTML+= '<i class="fa-solid fa-arrows-up-down-left-right"></i>';

                    imageElement.addEventListener('mouseover', () => {
                        arrowIcon.style.display = 'block';
                    });
                    imageElement.addEventListener('mouseout', () => {
                        arrowIcon.style.display = 'none';
                    });

                    iconsDiv.addEventListener('mouseover', () => {
                        arrowIcon.style.display = 'block';
                    });
                    iconsDiv.addEventListener('mouseout', () => {
                        arrowIcon.style.display = 'none';
                    });
                    
                    let trashIcon = document.createElement("a");
                    trashIcon.innerHTML+= '<i class="fa-regular fa-trash-can"></i>';
                    trashIcon.addEventListener('click', async function(e){
                        e.preventDefault();
                        figureElement.remove();
                        await deleteProjectsConfirmed(WorkId);
                    });

                    divImagesModale.appendChild(figureElement);
                    figureElement.appendChild(imageElement)
                    figureElement.appendChild(editImage);
                    figureElement.appendChild(iconsDiv);
                    iconsDiv.appendChild(arrowIcon);
                    iconsDiv.appendChild(trashIcon);
                
                }
                divGalerieModale.appendChild(divImagesModale);
            }
            else{ 
                console.log(error)
            }
        };
        
        loadProjects2();
    }
}





//Fonction pour supprimer travaux de l´API
async function deleteProjectsConfirmed(workId) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    });

    if (response.ok) {
        console.log('Travail supprimé avec succès');
        let deletedFigureElement = document.querySelector(`[data-work-id="${workId}"]`);
        deletedFigureElement.remove();
    } else {
        console.log('Impossible de supprimer le travail');
    }
}



function removeItemsModale () {
    const divGalerieModale = document.querySelector('.galeriePhotoModale');
    divGalerieModale.innerHTML = "" ;
}


//Fonction pour sauvegarder les changements 
const publierChangements = document.getElementById('Boutton-Publier-Changements');
publierChangements.addEventListener('click',function(e){
    e.preventDefault()
    window.location.reload();
})


//Fonction navigation Modale Page2
function createPage2Modale () {
    const page1Modale = document.querySelector('.Modale-Edit');
    const page2Modale = document.querySelector('.Modale-Add');
    const ajoutPhotoModale = document.querySelector('.Ajout-Button-Modale');

    ajoutPhotoModale.addEventListener('click', function (){
        page1Modale.style.display = 'none';
        page2Modale.style.display = 'block';
    })
}


//Fonction navigation exit Modale Page2
function closepage2Modale () {
    const page2Modale = document.querySelector('.Modale-Add');
    const page1Modale = document.querySelector('.Modale-Edit');
    page2Modale.style.display = 'none';
    page1Modale.style.display = 'block';

}


// Fonction pour revenir à la 1ere boîte Modale
const backPage1Modale = document.querySelector('.fa-arrow-left-long')
backPage1Modale.addEventListener('click', function(event) {
    event.preventDefault();
    closepage2Modale ();
    removeItemsModale ();
    openBoiteModale();
});


//Fonction pour fermer la 2eme Boîte Modale
const closeButton2Link = document.querySelector('.Close-Modale-2');
closeButton2Link.addEventListener('click', function(event) {
    event.preventDefault();
    closepage2Modale ();
    closeBoiteModale();
});


// Fonction pour supprimer toute la galerie
const supprimerGalerie = document.querySelector('.Supprimer-Button-Modale');
supprimerGalerie.addEventListener('click', function(event) {
    event.preventDefault();
    const imagesModale = document.querySelector('.Images-Modale')
    imagesModale.remove();
});





//Fonction pour ajouter une image 
const formData = new FormData();
const userData = JSON.parse(sessionStorage.getItem('userData'));
const ajoutButton = document.querySelector('.Ajout-Button-Modale');
const ajoutModale = document.querySelector('.Modale-Add');
const ajoutPhotosModale = document.querySelector('.Ajout-Photos-Modale');
const copieAjoutPhotosModale = ajoutPhotosModale.innerHTML;
const maxImageSize = 4 * 1024 * 1024; // 4 Mo en octets

if (userData) {

    ajoutButton.addEventListener('click', function() {
        ajoutModale.style.display = 'block';
    });

    function ajoutPhoto () {
    const ajoutPhotoInput = document.querySelector('.Ajout-Photos-Modale input[type="submit"]');
    ajoutPhotoInput.addEventListener('click', function() {

        // ouvrir une boîte de dialogue pour sélectionner une image
        const fileInput = document.createElement('input');
        console.log("Procesus Ajout Image");
        fileInput.classList.add("fileInput");
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.addEventListener('change', function() { 

        const file = fileInput.files[0];
        
        const imageAdd = document.createElement('img');
        imageAdd.classList.add("Image-Add");

        const reader = new FileReader();
        reader.addEventListener('load', function() {
            formData.delete('image');
            // Ajouter le contenu de l'image à l'objet FormData une fois que la lecture est terminée
            formData.append('image', file);
        });
        reader.readAsDataURL(file);

        console.log(fileInput.files);

        if (file && file.size <= maxImageSize) {
            ajoutPhotosModale.innerHTML = "";
            const imageUrl = URL.createObjectURL(file);
                
            imageAdd.src = imageUrl;
            ajoutPhotosModale.appendChild(imageAdd);

        } else {
            alert("Le fichier sélectionné est trop volumineux. Veuillez sélectionner un fichier de moins de 4 Mo.");
        }
        });
        fileInput.click();
    });
}
ajoutPhoto ()
}






// Fonction pour envoyer un nouveau projet à l'API
const validerEnvoiNouveauProjet = document.getElementById('valider');
validerEnvoiNouveauProjet.addEventListener("click", async function(e) {
    e.preventDefault();

    const title = document.getElementById('titre').value;
    let category = document.getElementById('category').value;
    const image = document.querySelector('.Image-Add');

    // Vérifier que toutes les données ont été fournies
    if (!title || !category | !image) {
        alert("Veuillez remplir tous les champs du formulaire");
    return;
    }

    formData.append('title', title);
    formData.append('category', category);

    console.log(title);
    console.log(category);

    if (userData) {
        const response = await fetch(`http://localhost:5678/api/works`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
                'accept': 'application/json'
            },
            body: formData
            });

        if (response.ok) {
            alert("Le nouveau projet a été ajouté avec succès !");
            
            const work = await response.json();

            // Créer un nouvel élément figure et afficher dans la gallerie 
            let sectionProjet = document.querySelector(".gallery");
            let figureElement = document.createElement("figure")

            let imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;

            let figureCaptionElement = document.createElement("figcaption")
            figureCaptionElement.innerHTML = work.title;

            figureElement.appendChild(imageElement);
            figureElement.appendChild(figureCaptionElement);
            figureElement.setAttribute("data-work-id", work.id);
            sectionProjet.appendChild(figureElement);

            // Réinitialiser le formulaire d´envoi du nouveau projet
            document.getElementById('titre').value = "";
            document.getElementById('category').value = "";
            ajoutPhotosModale.innerHTML = copieAjoutPhotosModale ;
            formData.delete('title');
            formData.delete('category');
            ajoutPhoto ();
        } else {
            alert("Une erreur est survenue lors de l'envoi du projet. Veuillez réessayer plus tard.");
        }
    } else {
        console.log("Access denied");
    }
});





    
    
