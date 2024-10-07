document.addEventListener('DOMContentLoaded', () => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    if (!userLogged) {
        window.location.href = 'login.html';
    }
});