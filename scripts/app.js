const error_message = document.querySelector('error_message');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const search = document.querySelector('#city');
const clear = document.querySelector('.clear');


const updateCity = async(city) => {
    // get details of the city and the weather condition
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeatherCondition(cityDetails.Key);

    return { cityDetails, weatherDetails };

};

// update the ui with the data gotten from the network
const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weatherDetails = data.weatherDetails;

    // destructure propertties
    const { cityDetails, weatherDetails } = data;

    // update the dom
    details.innerHTML =
        `
            <div class="text-muted text-uppercase text-center details">
                <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weatherDetails.WeatherText}</div>
                <h5 class="my-3">
                    <span>${cityDetails.AdministrativeArea.CountryID}</span> :
                    <span>${cityDetails.TimeZone.Code}</span>
                </h5>
                <h4 class="my-3">${cityDetails.TimeZone.Name}</h4>
                <div class="display-4 my-4">
                    <span>${weatherDetails.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
                <div class="display-4 my-4">
                    <span>${weatherDetails.Temperature.Imperial.Value}</span>
                    <span>&deg;F</span>
                </div>
            </div>
    `;

    // update the night/day and icon images
    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none') && clear.classList.contains('d-none')) {
        card.classList.remove('d-none');
        clear.classList.remove('d-none');
    }

};
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})


// submit searched location and get log out the data from the network request
search.addEventListener('change', e => {
    const city = search.value.trim();
    if (city.length) {
        search.value = "";
    }
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));

    // set localstorage
    localStorage.setItem('city', city);
});

// if we have any data in our local storage update it to the dom
if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city', city))
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));
}