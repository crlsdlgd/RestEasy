import User from "./class/User";

let userLogged;
document.addEventListener('DOMContentLoaded', () => {
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
})

document.getElementById('update-password-form').addEventListener('submit', (event) => {
    submitUpdatePassword(event);
})

const submitUpdatePassword = (event) => {
    event.preventDefault();

    const form = event.target;
    if (validateCurrentPassword()) {
        if (validatePasswords()) {
            const user = new User(
                userLogged.email,
                form.elements['new-password'].value,
                userLogged.firstName,
                userLogged.lastName,
                userLogged.birthDate
            );

            const users = JSON.parse(localStorage.getItem('users'));
            const index = users.findIndex((item) => item.email == user.email);
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userLogged', JSON.stringify(user));
            window.location.href = 'index.html';
        }
    }
};

const validateCurrentPassword = () => {
    if (userLogged.password !== document.getElementById('current-password').value) {
        document.getElementById('current-password-error').innerHTML = 'Passwords do not match';
        document.getElementById('current-password').style.border = 'red solid 1px';
        document.getElementById('update-current-password-container').style.margin = '1rem 1rem 2rem 1rem';
        return false;
    }
    return true;
};

const removeCurrentPasswordError = () => {
    document.getElementById('current-password-error').innerHTML = '';
    document.getElementById('current-password').style.border = 'none';
    document.getElementById('update-current-password-container').style.margin = '1rem';
};

const validatePasswords = () => {
    if (document.getElementById('new-password').value !==
        document.getElementById('confirm-new-password').value) {
        document.getElementById('confirm-password-error').innerHTML = 'Passwords do not match';
        document.getElementById('new-password').style.border = 'red solid 1px';
        document.getElementById('confirm-new-password').style.border = 'red solid 1px';
        document.getElementById('update-new-password-container').style.margin = '1rem 1rem 2rem 1rem';
        return false;
    }
    return true;
};

const removeConfirmPasswordError = () => {
    document.getElementById('confirm-password-error').innerHTML = '';
    document.getElementById('new-password').style.border = 'none';
    document.getElementById('confirm-new-password').style.border = 'none';
    document.getElementById('update-new-password-container').style.margin = '1rem';
};

document.getElementById('current-password').addEventListener('input', () => {
    removeCurrentPasswordError();
});

document.getElementById('confirm-new-password').addEventListener('input', () => {
    removeConfirmPasswordError();
    validatePasswords();
});
