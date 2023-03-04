
function openBoiteModale() {
    let Modale = document.getElementById('openModale');

    Modale.style.display = 'flex';
    Modale.setAttribute('aria-hidden', 'false');
    Modale.removeAttribute('aria-hidden');
    
    window.addEventListener('click', outsideClick);
}
    
function closeBoiteModale() {
    let Modale = document.getElementById('openModale');
    Modale.style.display = 'none';
    Modale.setAttribute('aria-hidden', 'true');
    
    window.removeEventListener('click', outsideClick);
}
    
function outsideClick(event) {
    let Modale = document.getElementById('openModale');
    if (event.target == Modale) {
        closeBoiteModale();
    }
}
    
document.addEventListener('DOMContentLoaded', function() {
    let openModaleLink = document.querySelector('.Lien-Open-Modale');
    let closeButtonLink = document.querySelector('.fa-solid');
    
    openModaleLink.addEventListener('click', function(event) {
        event.preventDefault();
        openBoiteModale();
    });
    
    closeButtonLink.addEventListener('click', function(event) {
        event.preventDefault();
        closeBoiteModale();
    });
});



