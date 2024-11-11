import User from "./class/User";

let userLogged;
const loadProfile = () => {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
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
};

const submitUpdateProfile = (event) => {
    event.preventDefault();
    const form = event.target;
    const user = new User(
        userLogged.email,
        userLogged.password,
        form.elements['first-name'].value,
        form.elements['last-name'].value,
        form.elements['birth-date'].value
    );
    // console.log('User', user);

    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex((item) => item.email == user.email);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userLogged', JSON.stringify(user));

    Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Account updated successfully.",
        showConfirmButton: false,
        timer: 2000
    });
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});

document.getElementById('update-profile-form').addEventListener('submit', (event) => {
    submitUpdateProfile(event);
});


