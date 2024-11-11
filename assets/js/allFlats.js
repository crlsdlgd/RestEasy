
let filteredFlats;
let citySortAsc = false;
let areaSortAsc = false;
let priceSortAsc = false;
let toggleView = true;

document.getElementById('filter-form').addEventListener('submit', (event) => {
    filterFlats(event);
});

document.addEventListener('DOMContentLoaded', () => {
    filteredFlats = JSON.parse(localStorage.getItem('flats'));
    renderTable();
    renderGrid();
});


document.getElementById('toggle-view').addEventListener('click', () => {
    if (toggleView) {
        document.getElementById('table-section-flats').style.display = 'none';
        document.getElementById('all-flats-grid-container').style.display = 'grid';
        toggleView = false;
    } else {
        document.getElementById('table-section-flats').style.display = 'block';
        document.getElementById('all-flats-grid-container').style.display = 'none';
        toggleView = true;
    }
})

function filterFlats(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    let minPrice = document.getElementById('min-price').value;
    let maxPrice = document.getElementById('max-price').value;
    let minArea = document.getElementById('min-area').value;
    let maxArea = document.getElementById('max-area').value;

    const flats = JSON.parse(localStorage.getItem('flats'));
    filteredFlats = flats;
    //Asignamos valores por defecto si no se han rellenado los filtros
    maxPrice ? maxPrice : maxPrice = Infinity;
    maxArea ? maxArea : maxArea = Infinity;
    minPrice ? minPrice : minPrice = 0;
    minArea ? minArea : minArea = 0;

    filteredFlats = filteredFlats.filter((flat) => {
        if (city) {
            if (flat.city.toLowerCase() !== city.toLowerCase()) {
                return false;
            }
        }

        if (flat.rentPrice < minPrice || flat.rentPrice > maxPrice) {
            return false;
        }
        if (flat.areaSize < minArea || flat.areaSize > maxArea) {
            return false;
        }
        return true;
    });
    // console.log('Filtered flats:', filteredFlats);
    renderTable();
    renderGrid();
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
    renderGrid();
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
    renderGrid();
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
    renderGrid();
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
    renderTable();
    renderGrid();
}

const checkFlatFavorite = (id) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    const favoriteFlats = userLogged.favoriteFlats;
    return favoriteFlats.includes(id);
}

const renderGrid = (flats = filteredFlats) => {
    const gridContainer = document.getElementById('all-flats-grid-container');
    gridContainer.innerHTML = '';
    for (const flat of flats) {
        const divContainer = document.createElement('div');
        divContainer.classList.add('card', 'shadow', 'overflow-hidden');
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        table.classList.add('bg-white', 'bg-opacity-20', 'w-full', 'text-[#1F375B]', 'border', 'border-[#1F375B]', 'table-rounded', 'table-fixed');
        // City
        const trCity = document.createElement('tr');
        trCity.classList.add('flex')
        const thCity = document.createElement('th');
        thCity.classList.add('flex-1');
        thCity.textContent = 'City';
        trCity.appendChild(thCity);
        const tdCity = document.createElement('td');
        tdCity.classList.add('flex-1');
        tdCity.textContent = flat.city;
        trCity.appendChild(tdCity);
        tbody.appendChild(trCity);

        // Street Name
        const trStreetName = document.createElement('tr');
        trStreetName.classList.add('flex')
        const thStreetName = document.createElement('th');
        thStreetName.classList.add('flex-1');
        thStreetName.textContent = 'Street Name';
        trStreetName.appendChild(thStreetName);
        const tdStreetName = document.createElement('td');
        tdStreetName.classList.add('flex-1');
        tdStreetName.textContent = flat.streetName;
        trStreetName.appendChild(tdStreetName);
        tbody.appendChild(trStreetName);

        // //Street Number
        const trStreetNumber = document.createElement('tr');
        trStreetNumber.classList.add('flex')
        const thStreetNumber = document.createElement('th');
        thStreetNumber.classList.add('flex-1');
        thStreetNumber.textContent = 'Street Number';
        trStreetNumber.appendChild(thStreetNumber);
        const tdStreetNumber = document.createElement('td');
        tdStreetNumber.classList.add('flex-1');
        tdStreetNumber.textContent = flat.streetNumber;
        trStreetNumber.appendChild(tdStreetNumber);
        tbody.appendChild(trStreetNumber);

        // //Area Size
        const trAreaSize = document.createElement('tr');
        trAreaSize.classList.add('flex')
        const thAreaSize = document.createElement('th');
        thAreaSize.classList.add('flex-1');
        thAreaSize.textContent = 'Area Size';
        trAreaSize.appendChild(thAreaSize);
        const tdAreaSize = document.createElement('td');
        tdAreaSize.classList.add('flex-1');
        tdAreaSize.textContent = flat.areaSize;
        trAreaSize.appendChild(tdAreaSize);
        tbody.appendChild(trAreaSize);

        // //Has AC
        const trHasAC = document.createElement('tr');
        trHasAC.classList.add('flex')
        const thHasAC = document.createElement('th');
        thHasAC.classList.add('flex-1');
        thHasAC.textContent = 'Has AC';
        trHasAC.appendChild(thHasAC);
        const tdHasAC = document.createElement('td');
        tdHasAC.classList.add('flex-1');
        tdHasAC.textContent = flat.hasAC ? 'Yes' : 'No';
        trHasAC.appendChild(tdHasAC);
        tbody.appendChild(trHasAC);

        // //Year Build
        const trYearBuild = document.createElement('tr');
        trYearBuild.classList.add('flex')
        const thYearBuild = document.createElement('th');
        thYearBuild.classList.add('flex-1');
        thYearBuild.textContent = 'Year Build';
        trYearBuild.appendChild(thYearBuild);
        const tdYearBuild = document.createElement('td');
        tdYearBuild.classList.add('flex-1');
        tdYearBuild.textContent = flat.yearBuild;
        trYearBuild.appendChild(tdYearBuild);
        tbody.appendChild(trYearBuild);

        // //Rent Price
        const trRentPrice = document.createElement('tr');
        trRentPrice.classList.add('flex')
        const thRentPrice = document.createElement('th');
        thRentPrice.classList.add('flex-1');
        thRentPrice.textContent = 'Rent Price';
        trRentPrice.appendChild(thRentPrice);
        const tdRentPrice = document.createElement('td');
        tdRentPrice.classList.add('flex-1');
        tdRentPrice.textContent = flat.rentPrice;
        trRentPrice.appendChild(tdRentPrice);
        tbody.appendChild(trRentPrice);

        // //Date Available
        const trDateAvailable = document.createElement('tr');
        trDateAvailable.classList.add('flex')
        const thDateAvailable = document.createElement('th');
        thDateAvailable.classList.add('flex-1');
        thDateAvailable.textContent = 'Date Available';
        trDateAvailable.appendChild(thDateAvailable);
        const tdDateAvailable = document.createElement('td');
        tdDateAvailable.classList.add('flex-1');
        tdDateAvailable.textContent = flat.dateAvailable;
        trDateAvailable.appendChild(tdDateAvailable);
        tbody.appendChild(trDateAvailable);

        //Favorite Button
        const trFavorite = document.createElement('tr');
        trFavorite.classList.add('flex')
        const thFavorite = document.createElement('th');
        thFavorite.classList.add('flex-1');
        thFavorite.textContent = 'Favorite';
        trFavorite.appendChild(thFavorite);
        const tdFavorite = document.createElement('td');
        tdFavorite.classList.add('flex-1');
        const favoriteButton = document.createElement('button');
        favoriteButton.onclick = (e) => toggleFavorite(flat.id, e);
        const redHeart = document.createElement('i');
        redHeart.classList.add('fa-solid', 'fa-heart', 'text-red-500');
        const grayHeart = document.createElement('i');
        grayHeart.classList.add('fa-regular', 'fa-heart', 'text-gray-500');
        checkFlatFavorite(flat.id) ? grayHeart.style.display = 'none' : redHeart.style.display = 'none';
        favoriteButton.appendChild(redHeart);
        favoriteButton.appendChild(grayHeart);
        tdFavorite.appendChild(favoriteButton);
        trFavorite.appendChild(tdFavorite);
        tbody.appendChild(trFavorite);

        table.appendChild(tbody);
        divContainer.appendChild(table);
        gridContainer.appendChild(divContainer);
    }
};