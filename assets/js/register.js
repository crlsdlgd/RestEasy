import User from "./class/User";

document.getElementById('register-form').addEventListener('submit', (event) => {
    submitRegister(event);
})
const submitRegister = (event) => {
    event.preventDefault();//evita que se recarge la pagina por defecto
    const form = event.target;

    const user = new User(
        form.elements['email'].value,
        form.elements['password'].value,
        form.elements['first-name'].value,
        form.elements['last-name'].value,
        form.elements['birth-date'].value
    );
    const confirmPassword = form.elements['confirm-password'].value;

    const users = JSON.parse(localStorage.getItem('users'));

    if (validatePasswords(user.password, confirmPassword)) {
        if (users == null) {
            localStorage.setItem('users', JSON.stringify([user]));
        } else if (!validateUniqueEmail(users, user.email)) {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

function validatePasswords(password, confirmPassword) {
    console.log(password, confirmPassword);
    if (password != confirmPassword) {
        document.getElementById('confirm-password-error').innerHTML = 'Passwords do not match';
        document.getElementById('password').style.border = 'red solid 1px';
        document.getElementById('confirm-password').style.border = 'red solid 1px';
        document.getElementById('passwords-container').style.margin = '1rem 1rem 2rem 1rem';
        return false;
    }
    return true;
}

function validateUniqueEmail(users, email) {
    const user = users.find((item) => item.email == email);
    if (user != undefined) {
        document.getElementById('email-error').innerHTML = 'Email already in use';
        document.getElementById('email').style.border = 'red solid 1px';
        document.getElementById('birth-date-email-container').style.margin = '1rem 1rem 2rem 1rem';
        return true;
    }
    return false;
}

document.getElementById('confirm-password').addEventListener('input', () => {
    removeConfirmPasswordError();
    validatePasswords(document.getElementById('password').value,
        document.getElementById('confirm-password').value);
})

document.getElementById('email').addEventListener('input', () => {
    removeUniqueEmailError();
    validateUniqueEmail(JSON.parse(localStorage.getItem('users')), document.getElementById('email').value);
})
const removeConfirmPasswordError = () => {
    document.getElementById('confirm-password-error').innerHTML = '';
    document.getElementById('password').style.border = 'none';
    document.getElementById('confirm-password').style.border = 'none';
    document.getElementById('passwords-container').style.margin = '1rem';
}
const removeUniqueEmailError = () => {
    document.getElementById('email-error').innerHTML = '';
    document.getElementById('email').style.border = 'none';
    document.getElementById('birth-date-email-container').style.margin = '1rem';
}