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

    const [email] = document.getElementsByName('email');
    email.value = user.email;
    const [firstName] = document.getElementsByName('first-name');
    firstName.value = user.firstName;
    const [lastName] = document.getElementsByName('last-name');
    lastName.value = user.lastName;
    const [birthDate] = document.getElementsByName('birth-date');
    birthDate.value = user.birthDate;
})