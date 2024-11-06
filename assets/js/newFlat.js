import Flat from "./class/Flat";
document.getElementById('new-flat-form').addEventListener('submit', (event) => {
    submitNewFlat(event);
});

const rentPrice = document.getElementById('rent-price');

rentPrice.addEventListener('blur', () => {
    const price = parseFloat(rentPrice.value);
    if (!isNaN(price)) {
        rentPrice.value = price.toFixed(2);
    }
});


const submitNewFlat = (event) => {
    event.preventDefault();
    const form = event.target;

    if (valdateYearBuild()) {
        if (validateDateAvailable()) {
            const flat = new Flat(
                form.elements['city'].value,
                form.elements['street-name'].value,
                form.elements['street-number'].value,
                form.elements['area-size'].value,
                form.elements['has-ac'].value,
                form.elements['year-build'].value,
                form.elements['rent-price'].value,
                form.elements['date-available'].value
            )

            const flats = JSON.parse(localStorage.getItem('flats'));
            if (flats == null) {
                localStorage.setItem('flats', JSON.stringify([flat]));
            } else {
                flats.push(flat);
                localStorage.setItem('flats', JSON.stringify(flats));
            }
        }
    }
}

const valdateYearBuild = () => {
    const yearBuild = document.getElementById('year-build');
    const currentYear = new Date().getFullYear();

    if (yearBuild.value > currentYear || yearBuild.value < currentYear - 50) {//La construccion no debe ser mayor a 50 anios, o un año futuro.
        yearBuild.style.border = '1px solid red';
        document.getElementById('year-build-error').innerHTML = 'Year build must be between ' + (currentYear - 50) + ' and ' + currentYear;
        document.getElementById('rent-year-build-container').classList.remove('xs:m-4');
        document.getElementById('rent-year-build-container').style.margin = '1rem 1rem 2rem 1rem';
        return false;
    } else {
        yearBuild.style.border = 'none';
        document.getElementById('year-build-error').innerHTML = '';
        document.getElementById('rent-year-build-container').classList.add('xs:m-4');
        document.getElementById('rent-year-build-container').style.margin = '1rem';
        return true;
    }
}

document.getElementById('year-build').addEventListener('blur', () => {
    valdateYearBuild();
});


const validateDateAvailable = () => {
    const dateAvailable = document.getElementById('date-available');
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const [year, month, day] = dateAvailable.value.split('-');
    const selectedDate = new Date(year, month - 1, day);

    const viewportWidth = window.innerWidth;
    if (selectedDate < currentDate) {
        dateAvailable.style.border = '1px solid red';
        document.getElementById('date-available-error').innerHTML = 'The selected date must be equal to or after the current date';
        if (viewportWidth >= 470) {
            document.getElementById('date-available-AC-container').classList.remove('xs:m-4');
            document.getElementById('date-available-AC-container').style.margin = '1rem 1rem 2rem 1rem';
        } else {
            document.getElementById('date-available-AC-container').classList.remove('gap-4');
            document.getElementById('date-available-AC-container').style.gap = '2rem';
        }
        return false;
    } else {

        dateAvailable.style.border = 'none';
        document.getElementById('date-available-error').innerHTML = '';
        return true;
    }
}

document.getElementById('date-available').addEventListener('blur', () => {
    validateDateAvailable();
})