/*//////////////   BURGER   /////////////// */

const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('cross');
    
    if (navLinks.style.height === '0px' || !navLinks.style.height) {
        navLinks.style.height = navLinks.scrollHeight + 'px'; 
    } else {
        navLinks.style.height = '0px'; 
    }
});