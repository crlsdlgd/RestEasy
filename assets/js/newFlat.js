import Flat from "./class/flat";
document.getElementById('new-flat-form').addEventListener('submit', (event) => {
    submitNewFlat(event);
})

const submitNewFlat = (event) => {
    event.preventDefault();
    const form = event.target;
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