import User from "./class/User";

document.addEventListener('DOMContentLoaded', () => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const user = new User(
        userLogged.email,
        userLogged.password,
        userLogged.firstName,
        userLogged.lastName,
        userLogged.birthDate
    )

    document.getElementById('user-name').innerHTML = `${user.firstName}`;
})

function logout() {
    localStorage.removeItem('userLogged');
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', logout);
