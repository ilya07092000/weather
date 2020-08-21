let form = document.querySelector('.weather__form');
let city = document.querySelector('.weather__city');
let temp = document.querySelector('.weather__temp');
let weatherImg = document.querySelector('.weather__icon__img');
let feelsLike = document.querySelector('[data-value = feelsLike]');
let windSpeed = document.querySelector('[data-value = windSpeed]');

form.addEventListener('submit', getValue);

function getData(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d59739ada0e0469dc6d9950a88046db4`)
    .then(response => {
        if(response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            alert('Bad Value')
        }
    })
}

async function getValue(event) {
    if(event) {
        event.preventDefault();
    }
    let value = form.querySelector('input').value;
    let weatherData = await getData(value);
    if(weatherData) {
        setContent(weatherData)
    }
}
getValue()

function setContent(data) {
    city.textContent = data.name;
    temp.textContent = + Number(data.main.temp - 273,15).toFixed(0) + '°C';
    weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    feelsLike.textContent = Number(data.main.feels_like - 273,15).toFixed(0) + '°C';
    windSpeed.textContent = data.wind.speed + 'm/s';
}

