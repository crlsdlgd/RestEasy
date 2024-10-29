const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('hidden');
}

const toggleUserMenu = () => {
    const userMenu = document.querySelector('#user-menu');
    userMenu.classList.toggle('hidden');
}

// document.addEventListener('DOMContentLoaded', () => {
//     const [email] = document.getElementsByName('email');
//     email.value = 'qwe@qwe.com';
// })
