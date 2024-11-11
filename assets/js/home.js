
let filteredFlats;
let citySortAsc = false;
let areaSortAsc = false;
let priceSortAsc = false;
// document.getElementById('filter-form').addEventListener('submit', (event) => {
//     filterFlats(event);
// });

document.addEventListener('DOMContentLoaded', () => {
    filteredFlats = JSON.parse(localStorage.getItem('flats'));
    filterFlats();
});


function filterFlats() {
    // event.preventDefault();
    // const city = document.getElementById('city').value;
    // let minPrice = document.getElementById('min-price').value;
    // let maxPrice = document.getElementById('max-price').value;
    // let minArea = document.getElementById('min-area').value;
    // let maxArea = document.getElementById('max-area').value;

    // const flats = JSON.parse(localStorage.getItem('flats'));
    // filteredFlats = flats;
    // //Asignamos valores por defecto si no se han rellenado los filtros
    // maxPrice ? maxPrice : maxPrice = Infinity;
    // maxArea ? maxArea : maxArea = Infinity;
    // minPrice ? minPrice : minPrice = 0;
    // minArea ? minArea : minArea = 0;

    // filteredFlats = filteredFlats.filter((flat) => {
    //     if (city) {
    //         if (flat.city !== city) {
    //             return false;
    //         }
    //     }
    //     if (flat.rentPrice < minPrice || flat.rentPrice > maxPrice) {
    //         return false;
    //     }
    //     if (flat.areaSize < minArea || flat.areaSize > maxArea) {
    //         return false;
    //     }
    //     return true;
    // });
    // // console.log('Filtered flats:', filteredFlats);
    // renderTable();
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const favoriteFlats = userLogged.favoriteFlats;
    filteredFlats = filteredFlats.filter((flat) => favoriteFlats.includes(flat.id));
    renderTable();
};

const renderTable = (flats = filteredFlats) => {
    const table = document.getElementById('all-flats-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    for (const flat of flats) {
        const row = document.createElement('tr');

        // city
        const tdCity = document.createElement('td');
        tdCity.textContent = flat.city;
        row.appendChild(tdCity);
        // street name
        const tdStreetName = document.createElement('td');
        tdStreetName.textContent = flat.streetName;
        row.appendChild(tdStreetName);
        // street number
        const tdStreetNumber = document.createElement('td');
        tdStreetNumber.textContent = flat.streetNumber;
        row.appendChild(tdStreetNumber);
        // area size
        const tdAreaSize = document.createElement('td');
        tdAreaSize.textContent = flat.areaSize;
        row.appendChild(tdAreaSize);
        // has AC
        const tdHasAC = document.createElement('td');
        tdHasAC.textContent = flat.hasAC;
        row.appendChild(tdHasAC);
        // year build
        const tdYearBuild = document.createElement('td');
        tdYearBuild.textContent = flat.yearBuild;
        row.appendChild(tdYearBuild);
        // rent price
        const tdRentPrice = document.createElement('td');
        tdRentPrice.textContent = flat.rentPrice;
        row.appendChild(tdRentPrice);
        // date available
        const tdDateAvailable = document.createElement('td');
        tdDateAvailable.textContent = flat.dateAvailable;
        row.appendChild(tdDateAvailable);
        // Favorite Button
        const tdFavorite = document.createElement('td');
        tdFavorite.classList.add('text-center');
        const favoriteButton = document.createElement('button');
        favoriteButton.onclick = (e) => toggleFavorite(flat.id, e);
        // favoriteButton.textContent = (checkFlatFavorite(flat.id)) ? 'Remove Favorite' : 'Add Favorite';
        const redHeart = document.createElement('i');
        redHeart.classList.add('fa-solid', 'fa-heart', 'text-red-500');
        const grayHeart = document.createElement('i');
        grayHeart.classList.add('fa-regular', 'fa-heart', 'text-gray-500');
        checkFlatFavorite(flat.id) ? grayHeart.style.display = 'none' : redHeart.style.display = 'none';
        favoriteButton.appendChild(redHeart);
        favoriteButton.appendChild(grayHeart);
        tdFavorite.appendChild(favoriteButton);
        row.appendChild(tdFavorite);
        tableBody.appendChild(row);
    }
};
// Filtro que alterna entre orden ascendente y descendente 
document.getElementById('sort-city').addEventListener('click', () => {
    if (citySortAsc) {
        filteredFlats.sort((a, b) => b.city.localeCompare(a.city));
        citySortAsc = false;
    } else {
        filteredFlats.sort((a, b) => a.city.localeCompare(b.city));
        citySortAsc = true;
    }
    renderTable();
});

document.getElementById('sort-area').addEventListener('click', () => {
    if (areaSortAsc) {
        filteredFlats.sort((a, b) => b.areaSize - a.areaSize);
        areaSortAsc = false;
    } else {
        filteredFlats.sort((a, b) => a.areaSize - b.areaSize);
        areaSortAsc = true;
    }
    renderTable();
});

document.getElementById('sort-price').addEventListener('click', () => {
    if (priceSortAsc) {
        filteredFlats.sort((a, b) => b.rentPrice - a.rentPrice);
        priceSortAsc = false;
    } else {
        filteredFlats.sort((a, b) => a.rentPrice - b.rentPrice);
        priceSortAsc = true;
    }
    renderTable();
});

const toggleFavorite = (id, e) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const favoriteFlats = userLogged.favoriteFlats;
    const users = JSON.parse(localStorage.getItem('users'));
    const button = e.currentTarget;
    if (checkFlatFavorite(id, e)) {
        favoriteFlats.splice(favoriteFlats.indexOf(id), 1);
        button.children[0].style.display = 'none';
        button.children[1].style.display = 'block';
    } else {
        favoriteFlats.push(id);
        button.children[0].style.display = 'block';
        button.children[1].style.display = 'none';
    };
    userLogged.favoriteFlats = favoriteFlats;
    localStorage.setItem('userLogged', JSON.stringify(userLogged));
    const index = users.findIndex((item) => item.email == userLogged.email);
    users[index] = userLogged;
    localStorage.setItem('users', JSON.stringify(users));
    filterFlats();
}

const checkFlatFavorite = (id) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const favoriteFlats = userLogged.favoriteFlats;
    return favoriteFlats.includes(id);
}