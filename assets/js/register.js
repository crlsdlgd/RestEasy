
const submitRegister = (event) => {
    event.preventDefault();//evita que se recarge la pagina por defecto
    const form = event.target;

    const user = {
        firstName: form.elements['first-name'].value,
        lastName: form.elements['last-name'].value,
        birthDate: form.elements['birth-date'].value,
        email: form.elements['email'].value,
        password: form.elements['password'].value,
        confirmPassword: form.elements['confirm-password'].value,
    }

    const users = JSON.parse(localStorage.getItem('users'));

    if (validatePasswords(user.password, user.confirmPassword)) {
        if (users == null) {
            // const arrayUsers = [];
            // arrayUsers.push(user);
            // localStorage.setItem('users', JSON.stringify(arrayUsers));
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

const removeConfirmPasswordError = () => {
    document.getElementById('confirm-password-error').innerHTML = '';
    document.getElementById('password').style.border = 'none';
    document.getElementById('confirm-password').style.border = 'none';
    document.getElementById('passwords-container').style.margin = '1rem';
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

const removeUniqueEmailError = () => {
    document.getElementById('email-error').innerHTML = '';
    document.getElementById('email').style.border = 'none';
    document.getElementById('birth-date-email-container').style.margin = '1rem';
}