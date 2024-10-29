import User from "./class/user";

document.addEventListener('DOMContentLoaded', () => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const user = new User(
        userLogged.email,
        userLogged.password,
        userLogged.firstName,
        userLogged.lastName,
        userLogged.birthDate
    )

    document.getElementById('user-name').innerHTML = `${user.firstName} ${user.lastName}`
})

function logout() {
    localStorage.setItem('userLogged', null);
}
