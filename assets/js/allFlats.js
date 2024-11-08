
document.getElementById('filter-form').addEventListener('submit', (event) => {
    filterFlats(event);
});

document.addEventListener('DOMContentLoaded', () => {
    const flats = JSON.parse(localStorage.getItem('flats'));
    renderTable(flats);
});

function filterFlats(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    let minPrice = document.getElementById('min-price').value;
    let maxPrice = document.getElementById('max-price').value;
    let minArea = document.getElementById('min-area').value;
    let maxArea = document.getElementById('max-area').value;

    const flats = JSON.parse(localStorage.getItem('flats'));
    let filteredFlats = flats;
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
    renderTable(filteredFlats);
};

const renderTable = (flats) => {
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