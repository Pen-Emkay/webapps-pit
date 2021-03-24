function onPageLoad() {
    start();
}

async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    console.log(data);
}