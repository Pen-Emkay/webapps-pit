async function start() {
    try {
        let query = 'https://api.covid19api.com/live/country/india/status/confirmed/date/' + getDateLiteral();
        const response = await fetch(query);
        const data = await response.json();
        populateList(data);

    } catch (e) {
        console.log('Sorry, there was a problem!');
    }

    function populateList(countryDetails) {
        document.getElementById('date').innerHTML = "Data as on: " + getDateLiteral();
        countryDetails.forEach(element => {
            document.getElementById('countryList').insertAdjacentHTML("beforeend", `<li><b> ${element.Province}:</b> (Active cases: ${element.Active})</li>`);
            console.log(element.Province);
        });


    }

}

function getDateLiteral() {
    let theDate = new Date();
    let theMonth = theDate.getMonth();
    let theDay = theDate.getDate();
    theMonth++;
    theDay--;
    const dateLiteral = theDate.getFullYear() + '-' + theMonth + '-' + theDay;
    return dateLiteral;
}