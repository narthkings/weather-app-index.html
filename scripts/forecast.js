class Forecast {
    constructor() {
        this.key = '8cEISv2nVDdWb5aMTBhRnV47vrz8GCR3';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        // get details of the city and the weather condition
        const cityDetails = await this.getCity(city);
        const weatherDetails = await this.getWeatherCondition(cityDetails.Key);

        return { cityDetails, weatherDetails };

    }

    async getCity(city) {
        const base = `?apikey=${this.key}&q=${city}`;

        // retrurn a promise which holds the endpoint
        const response = await fetch(this.cityURI + base);
        const data = await response.json();
        return data[0];
    }

    async getWeatherCondition(id) {
        const base = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + base);
        const data = await response.json();
        return data[0];
    }


}



// getCity('lagos')
//     // this would get the city and the weather condition at the particular time
//     .then(data => getWeatherCondition(data.Key)) //the data.Key refers to the id that the condition requires
//     .then(data => console.log(data))
//     .catch(err => console.log(err.message));

// getWeatherCondition(4607);