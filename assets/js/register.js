
const submitRegister = (event) => {
    event.preventDefault();//evita que se recarge la pagina por defecto
    const form = event.target;
    // const firstName = form.elements['first-name'].value;
    // const lastName = form.elements['last-name'].value;
    // const birthDate = form.elements['birth-date'].value;
    // const email = form.elements['email'].value;
    // const password = form.elements['password'].value;
    // const confirmPassword = form.elements['confirm-password'].value;

    const user = {
        firstName: form.elements['first-name'].value,
        lastName: form.elements['last-name'].value,
        birthDate: form.elements['birth-date'].value,
        email: form.elements['email'].value,
        password: form.elements['password'].value,
        confirmPassword: form.elements['confirm-password'].value,
    }

    const users = JSON.parse(localStorage.getItem('users')); //si no hay nada en el local storage se crea un array vacio

    if (users == null) {
        const arrayUsers = [];
        arrayUsers.push(user);
        localStorage.setItem('users', JSON.stringify(arrayUsers));
    } else {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // localStorage.setItem('users', JSON.stringify(user));
    // console.log('Usuario guardado con exito');
}