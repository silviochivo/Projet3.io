//Récupération de tous les Projets
if (window.location.href.endsWith("index.html")) {
  async function loadProjects() {
      let response = await fetch("http://localhost:5678/api/works");

      console.log(response.status); // 200
      console.log(response.statusText); // OK

      if (response.status === 200) {
        let work = await response.json();
        console.log(work);

        for(let i = 0; i < work.length; i++) {

          let boxWork = work[i];
          let sectionProjet = document.querySelector(".gallery");
          let figureElement = document.createElement("figure")

          let imageElement = document.createElement("img");
          imageElement.src = work[i].imageUrl
          imageElement.alt = work[i].title

          let figureCaptionElement = document.createElement("figcaption")
          figureCaptionElement.innerHTML = work[i].title;
          
          figureElement.appendChild(imageElement);
          figureElement.appendChild(figureCaptionElement);
          sectionProjet.appendChild(figureElement);
        }
      }
      else{ 
        console.log("erreur dans la récupérations des traveaux")
      }
  };


  loadProjects();

}


//Filtres 

const userDataCheck = JSON.parse(sessionStorage.getItem('userData'));
if (!userDataCheck && (window.location.href.endsWith("index.html"))) {

  async function filterProjects() {
      const response = await fetch("http://localhost:5678/api/works");
      const filterWorks = await response.json();
    
      function afficherProjetsFiltres(works) {
        let sectionProjet = document.querySelector(".gallery");
        sectionProjet.innerHTML = "";
    
        for (let i = 0; i < works.length; i++) {
          let boxWork = works[i];
          let figureElement = document.createElement("figure");
    
          let imageElement = document.createElement("img");
          imageElement.src = works[i].imageUrl;
          imageElement.alt = works[i].title;
    
          let figureCaptionElement = document.createElement("figcaption");
          figureCaptionElement.innerHTML = works[i].title;
    
          figureElement.appendChild(imageElement);
          figureElement.appendChild(figureCaptionElement);
          sectionProjet.appendChild(figureElement);
        }
      }
    
      const filterButtonObject = document.getElementById('Boutton-Filter-Objets');
      filterButtonObject.addEventListener('click', function() {
        const WorkFilteredObjects = filterWorks.filter(works => works.categoryId == 1);
        console.log(WorkFilteredObjects);
        afficherProjetsFiltres(WorkFilteredObjects);
      });
    
      const filterButtonAppartements = document.getElementById('Boutton-Filter-Appartements');
      filterButtonAppartements.addEventListener('click', function() {
        const WorkFilteredAppartements = filterWorks.filter(works => works.categoryId == 2);
        console.log(WorkFilteredAppartements);
        afficherProjetsFiltres(WorkFilteredAppartements);
      });
    
      const filterButtonHotels = document.getElementById('Boutton-Filter-Hotels-Et-Restaurants');
      filterButtonHotels.addEventListener('click', function() {
        const WorkFilteredHotels = filterWorks.filter(works => works.categoryId == 3);
        console.log(WorkFilteredHotels);
        afficherProjetsFiltres(WorkFilteredHotels);
      });

      const filterButtonTous = document.getElementById('Boutton-Filter-Tous');
      filterButtonTous.addEventListener('click', function() {
          afficherProjetsFiltres(filterWorks);
      });
    
      // Affiche tous les projets par défaut
      afficherProjetsFiltres(filterWorks);

    }
    
    filterProjects();
  
} else {
  console.log("Mode Edition, impossible d´afficher les filtres des projets")
}
