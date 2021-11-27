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
const key = ''

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
    
}


function showError(error){
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = ` ${error.message}`
}