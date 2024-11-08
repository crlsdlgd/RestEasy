
let filteredFlats;
let citySortAsc = false;
let areaSortAsc = false;
let priceSortAsc = false;
document.getElementById('filter-form').addEventListener('submit', (event) => {
    filterFlats(event);
});

document.addEventListener('DOMContentLoaded', () => {
    filteredFlats = JSON.parse(localStorage.getItem('flats'));
    renderTable();
});


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
            if (flat.city !== city) {
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
};

const renderTable = (flats = filteredFlats) => {
    const table = document.getElementById('all-flats-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    for (const flat of flats) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="text-[#1F375B]">${flat.city}</td>
        <td class="text-[#1F375B]">${flat.streetName}</td>
        <td class="text-[#1F375B]">${flat.streetNumber}</td>
        <td class="text-[#1F375B]">${flat.areaSize}</td>
        <td class="text-[#1F375B]">${flat.hasAC}</td>
        <td class="text-[#1F375B]">${flat.yearBuild}</td>
        <td class="text-[#1F375B]">${flat.rentPrice}</td>
        <td class="text-[#1F375B]">${flat.dateAvailable}</td>`;
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