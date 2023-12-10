document.addEventListener('DOMContentLoaded', function() {
    customElements.define('la-jolla-weather', class extends HTMLElement {
        connectedCallback() {
            this.displayWeather();
        }
    
        displayWeather() {
            fetch('https://api.weather.gov/gridpoints/SGX/53,20/forecast/hourly')
            .then(response => response.json())
            .then(data => {
                const todayForcastObj = data.properties.periods[0]
                const temperature = todayForcastObj.temperature; // Current temp
                /** @type {string} */
                const forecastdescription = todayForcastObj.shortForecast;
                const temperatureUnit = todayForcastObj.temperatureUnit; 
                const humidity = todayForcastObj.relativeHumidity.value; // Current humidity
    
                const temperatureElement = this.querySelector('#temperature');
                const forecastElement = this.querySelector('#forecast');
                const humidityElement = this.querySelector('#humidity');
                const iconElement = this.querySelector('#weather-icon');
    
                temperatureElement.textContent = `${temperature} ${temperatureUnit}`;
                forecastElement.textContent = `${forecastdescription}`
                humidityElement.textContent = `${humidity}%`;
                let weatherIconsvgPath = '';
                if(todayForcastObj.isDayTime==false) {weatherIconsvgPath='night.svg';}
                else if(forecastdescription.toLowerCase().includes('sunny')) 
                    weatherIconsvgPath = 'sunny.svg';
                else if(forecastdescription.toLowerCase().includes('cloudy')) 
                    weatherIconsvgPath = 'cloudy.svg';
                else if(forecastdescription.toLowerCase().includes('rain'))
                    weatherIconsvgPath = 'rainy.svg';
                iconElement.data = weatherIconsvgPath;
            })
            .catch(error => {
                console.error('Weather api server error:', error);
            });
        }
    });
});
