const apiKey = 'BCX4aAPMj3Q44U6Zv1zlsEeOAPaTVADn ';

const getWeatherCondition = async(id) => {
    const resource_url = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const base = `${id}?apikey=${apiKey}`;
    const response = await fetch(resource_url + base);

    const data = await response.json();
    return data[0];

};

const getCity = async(city) => {
    // get url together with the base (apikey and city)
    const resource_url = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const base = `?apikey=${apiKey}&q=${city}`;

    // retrurn a promise which holds the endpoint
    const response = await fetch(resource_url + base);
    const data = await response.json();
    return data[0];

};

// getCity('lagos')
//     // this would get the city and the weather condition at the particular time
//     .then(data => getWeatherCondition(data.Key)) //the data.Key refers to the id that the condition requires
//     .then(data => console.log(data))
//     .catch(err => console.log(err.message));

// getWeatherCondition(4607);