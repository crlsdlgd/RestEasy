import User from "./class/user";

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

    if (validateAge(user.birthDate)) {
        if (validatePasswords(user.password, confirmPassword)) {
            if (users == null) {
                localStorage.setItem('users', JSON.stringify([user]));
            } else if (!validateUniqueEmail(users, user.email)) {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                Swal.fire({

                    icon: "success",
                    title: "Registration successful! Please log in to continue.",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        }
    }

}

function validatePasswords(password, confirmPassword) {
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
// esta funcion valida que el usuario tenga entre 18 años y 120 años 
function validateAge(birthDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();

    // Ajuste de la edad si el cumpleaños no ha ocurrido aún este año
    const isBirthdayPassed =
        today.getMonth() > birthDateObj.getMonth() ||
        (today.getMonth() === birthDateObj.getMonth() && today.getDate() >= birthDateObj.getDate());

    if (!isBirthdayPassed) {
        age--;
    }

    // Validar que la edad esté dentro del rango permitido
    if (age < 18 || age > 120) {
        document.getElementById('birth-date-error').innerHTML = 'You must be between 18 and 120 years old';
        document.getElementById('birth-date').style.border = 'red solid 1px';
        if (window.innerWidth >= 470) {
            document.getElementById('birth-date-email-container').classList.remove('xs:m-4');
            document.getElementById('birth-date-email-container').style.margin = '1rem 1rem 2rem 1rem';
        } else {
            document.getElementById('birth-date-email-container').classList.remove('gap-4');
            document.getElementById('birth-date-email-container').style.gap = '2rem';
        }
        return false;
    }

    return true;
}

document.getElementById('birth-date').addEventListener('input', () => {
    removeAgeError();
    validateAge(document.getElementById('birth-date').value);
})

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

const removeAgeError = () => {
    document.getElementById('birth-date-error').innerHTML = '';
    document.getElementById('birth-date').style.border = 'none';
    document.getElementById('birth-date-email-container').style.margin = '1rem';
}