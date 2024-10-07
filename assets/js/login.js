const submitLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const user = {
        password: form.elements['password'].value,
        email: form.elements['email'].value,

    }
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
