/*//////////////    MINIATURES - Mobile uniquement  /////////////// */

// Fonction pour détecter si un élément est au centre de l'écran (zone plus haute sur l'écran)
function isElementInView(element, isBox2) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Pour box2 et box1, la zone de détection commence plus haut sur l'écran à 5% (ou 10%)
    // La zone se termine à 85% de la hauteur de la fenêtre pour un meilleur effet
    if (isBox2) {
        return rect.top >= (windowHeight * 0.05) && rect.bottom <= (windowHeight * 0.85); // Zone commencant à 5% pour .box2
    } else {
        return rect.top >= (windowHeight * 0.05) && rect.bottom <= (windowHeight * 0.70); // Zone commencant à 5% pour .box1 aussi
    }
}

// Fonction pour appliquer l'effet de survol (hover) sur l'image uniquement
function applyHoverEffectOnImage() {
    // Vérifier si l'on est sur un appareil mobile
    if (!isMobile()) {
        return; // Ne pas appliquer l'effet sur desktop
    }

    const items = document.querySelectorAll('.item'); // Récupérer tous les éléments contenant les images
    let selectedItem = null; // Variable pour suivre l'élément actuellement sélectionné

    items.forEach((item) => {
        const imgBox1 = item.querySelector('.box1 img'); // Récupérer l'image dans box1
        const imgBox2 = item.querySelector('.box2 img'); // Récupérer l'image dans box2

        // Vérifier si l'image dans .box1 est au centre de l'écran
        if (imgBox1 && isElementInView(imgBox1, false)) {
            // Ajouter la classe hovered pour agrandir et changer l'apparence
            item.classList.add('hovered');
            selectedItem = item; // Marquer cet élément comme sélectionné
        }
        // Vérifier si l'image dans .box2 est au centre de l'écran avec zone élargie
        else if (imgBox2 && isElementInView(imgBox2, true)) {
            item.classList.add('hovered');
            selectedItem = item; // Marquer cet élément comme sélectionné
        } else {
            // Si l'élément n'est pas au centre, enlever la classe hovered
            item.classList.remove('hovered');
        }
    });

    // Si un élément est sélectionné, enlever les autres éléments de la classe hovered
    if (selectedItem) {
        items.forEach((item) => {
            if (item !== selectedItem) {
                item.classList.remove('hovered');
            }
        });
    }
}

// Appliquer l'effet lors du scroll
window.addEventListener('scroll', applyHoverEffectOnImage);

// Appliquer l'effet lors du chargement de la page
window.addEventListener('load', applyHoverEffectOnImage);

// Appliquer l'effet lors du redimensionnement de la fenêtre
window.addEventListener('resize', applyHoverEffectOnImage);

// Vérifier si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768; // Taille de l'écran pour considérer mobile
}
