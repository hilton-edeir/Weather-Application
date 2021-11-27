const iconElement = document.querySelector('#icon-temperature')
const temperatureElement = document.querySelector('#temperature-value')
const descriptionElement = document.querySelector('#weather-description')
const locationElement = document.querySelector('#location')
const notificationElement = document.querySelector('#notification')


const weather = {}

weather.temperature = {
    unit: 'celsius'
}

const KELVIN = 273
const key = '96f6ba150dbfde1782395bffef95d6a2'

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}
else{
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<div class="alert alert-danger" role="alert">Browser doesn't support Geolocalization</div>`
}


function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude =  position.coords.longitude
    
    getWeather(latitude, longitude)
}


function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    
    fetch(api).then(function(response) {
        let data = response.json()
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
    })
    .then(function(){
        displayWeather();
    })
}


function displayWeather(){
    iconElement.innerHTML = `<img src="img/openweather-icons/${weather.iconId}.png" class="img-fluid" alt="icon">`
    temperatureElement.innerHTML = `${weather.temperature.value}`
    descriptionElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

function showError(error){
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = ` ${error.message}`
}