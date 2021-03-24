function onPageLoad() {
    start();
}

async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
        <select>
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed){
               return `<option>${breed}</option>`
        }).join('')}
        </select>    
    `;
}