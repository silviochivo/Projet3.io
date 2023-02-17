
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();


const blocProjet = works[0];
const imageElement = document.createElement("img");
imageElement.src = works.imageUrl
const figureElement = document.createElement("figcaption")
figureElement.innerText = works.title


const sectionProjet = document.querySelector(".gallery");
sectionProjet.appendChild(imageElement);
sectionProjet.appendChild(figureElement);




