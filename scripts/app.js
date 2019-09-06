const form_city = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

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
                <div class="display-4 my-4">
                    <span>${weatherDetails.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            </div>
    `;

    // update the night/day and icon images
    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    const timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};



// submit searched location and get log out the data from the network request
form_city.addEventListener('submit', e => {
    e.preventDefault()
    const city = form_city.city.value.trim();
    form_city.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));
});