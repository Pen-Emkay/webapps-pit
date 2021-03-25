let slideShowInterval;
let firstPhotoDelay;

function onPageLoad() {
    start();
}

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createBreedList(data.message);
    } catch (e) {
        document.getElementById("slideShow").innerHTML = `
        <div style="color: white; text-align: center; padding:10px;">Sorry, there was a problem!</div>`

    }
}

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
        <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed){
               return `<option>${breed}</option>`
        }).join('')}
        </select>    
    `;
}

async function loadByBreed(selectedBreed){
    if(selectedBreed!="Choose a dog breed")
    {
        const response= await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
        const data=await response.json();
        createSlideShow(data.message);
    }
    
}

function createSlideShow(imageList){
    if (slideShowInterval) clearInterval(slideShowInterval);
    if (firstPhotoDelay) clearTimeout(firstPhotoDelay);
    let currentPosition=0;
    if(imageList.length>1){
        document.getElementById("slideShow").innerHTML=`
        <div class="slide" style="background-image: url('${imageList[0]}')"></div>
        <div class="slide" style="background-image: url('${imageList[1]}')"></div>`;
        currentPosition+=2;
        if(imageList.length==2)currentPosition=0;
        slideShowInterval= setInterval(nextSlide, 3000 );
    }
    else{
        document.getElementById("slideShow").innerHTML=`
        <div class="slide" style="background-image: url('${imageList[0]}')"></div>
        <div class="slide"></div>`;
    }
    
    function nextSlide()
    {
        document.getElementById("slideShow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${imageList[currentPosition]}')"></div>`);
        firstPhotoDelay=setTimeout(function(){document.querySelector(".slide").remove();},1000);
        if(currentPosition+1 >= imageList.length){
            currentPosition=0;
        }else{
            currentPosition++;
        }
    }
}