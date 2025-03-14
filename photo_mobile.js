/*//////////////    MINIATURES - Mobile uniquement  /////////////// */

// Fonction pour vérifier si un élément est dans la zone de détection
function isElementInView(element, isBox2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (isBox2) {
        return rect.top >= (windowHeight * 0.02) && rect.bottom <= (windowHeight * 0.85); // Détection plus haute pour .box2
    } else {
        return rect.top >= (windowHeight * 0.02) && rect.bottom <= (windowHeight * 0.75); // Détection plus haute pour .box1
    }
}

// Fonction pour gérer l'effet de survol des images sur mobile
function applyHoverEffectOnImage() {
    if (!isMobile()) return; // Ne rien faire sur desktop

    const items = document.querySelectorAll('.item');
    let selectedItem = null; // Variable pour stocker l'élément qui doit être en hovered

    items.forEach((item) => {
        const imgBox1 = item.querySelector('.box1 img');
        const imgBox2 = item.querySelector('.box2 img');

        if (!selectedItem && imgBox1 && isElementInView(imgBox1, false)) {
            selectedItem = item;
        } 
        else if (!selectedItem && imgBox2 && isElementInView(imgBox2, true)) {
            selectedItem = item;
        }
    });

    // Mise à jour des classes : une seule image en hovered
    items.forEach((item) => {
        if (item === selectedItem) {
            item.classList.add('hovered');
        } else {
            item.classList.remove('hovered');
        }
    });
}

// Appliquer l'effet lors du chargement, du scroll et du redimensionnement
window.addEventListener('load', applyHoverEffectOnImage);
window.addEventListener('scroll', applyHoverEffectOnImage);
window.addEventListener('resize', applyHoverEffectOnImage);

// Vérifier si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}
