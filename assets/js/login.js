import User from "./class/User";

document.getElementById('login-form').addEventListener('submit', (event) => {
    submitLogin(event)
})

function submitLogin(event) {
    event.preventDefault();
    const form = event.target;
    const user = new User(
        form.elements['email'].value,
        form.elements['password'].value
    );

    let userLogged;
    const users = JSON.parse(localStorage.getItem('users'));

    if (users == null) {
        alert('No hay usuarios registrados');
    } else {
        userLogged = users.find((item) => item.email == user.email && item.password == user.password)
    }
    if (userLogged == undefined) {
        alert('Usuario o contraseña incorrecta');
    } else {
        localStorage.setItem('userLogged', JSON.stringify(userLogged));
        window.location.href = 'index.html';
    }
}


