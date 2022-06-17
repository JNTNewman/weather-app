import apiKey from './store.js'

let baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather?'

let cityName = 'Kathmandu' // default city
let input = document.querySelector('input')
let button = document.querySelector('button')
let cityInput = document.querySelector('#city-input')
let backgroundContainer = document.querySelector('.bg-div')
let sunriseTag = document.querySelector('#sunrise')
let sunsetTag = document.querySelector('#sunset')
let weatherLocationTimeTag = document.querySelector('#weather-location-time')
let weatherConditionTag = document.querySelector('#condition')
let humidityTag = document.querySelector('#humidity')
let temperatureTag = document.querySelector('#temperature')
let countryTag = document.querySelector('.country')
let weatherIconTag = document.querySelector('#weather-icon')
let cloudCoverTag = document.querySelector('#cloud-cover')
let windSpeedTag = document.querySelector('#wind')
let actualFeelTag = document.querySelector('#feels-like')

window.addEventListener('load', e => {
  e.preventDefault()
  input.value = cityName
  getWeatherData(cityName)
})

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    cityName = input.value
    getWeatherData(cityName)
  }
})

button.addEventListener('click', e => {
  e.preventDefault()
  cityName = input.value
  getWeatherData(cityName)
})

cityInput.addEventListener('focusin', e => {
  cityInput.value = ' '
  cityInput.placeholder = `${cityName}`
})

cityInput.addEventListener('focusout', e => {
  cityInput.value = `${cityName}`
  cityInput.placeholder = `${cityName}`
})

function capitalizeWords (sentenceString) {
  let __tmpArray = []
  const wordsArray = sentenceString.split(' ')
  wordsArray.forEach(word => {
    const capitalizedWord = word.slice(0, 1).toLocaleUpperCase() + word.slice(1)
    __tmpArray.push(capitalizedWord)
  })
  return __tmpArray.join(' ')
}

async function getWeatherData (city) {
  const url = baseApiUrl + 'q=' + city + '&units=metric&appid=' + apiKey
  let response = await fetch(url)
  const responseStatus = response.status
  if (responseStatus === 200) {
    const data = await response.json()
    const weather = data.weather[0]
    let weatherState = weather.description
    const conditionString = weather.main.toLowerCase()
    weatherState = capitalizeWords(weatherState)
    const localeTZ = new Date().getTimezoneOffset() / 60
    const weatherTZ = data.timezone / 3600
    const weatherLocationDate = new Date(
      data.dt * 1000 + (localeTZ + weatherTZ) * 3600000
    )
    const sunriseDate = new Date(
      data.sys.sunrise * 1000 + (localeTZ + weatherTZ) * 3600000
    )
    const sunsetDate = new Date(
      data.sys.sunset * 1000 + (localeTZ + weatherTZ) * 3600000
    )
    const sunriseTime = sunriseDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    const sunsetTime = sunsetDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    const weatherLocationTime = weatherLocationDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    if (
      weatherLocationDate.getHours() > sunriseDate.getHours() &&
      weatherLocationDate.getHours() < sunsetDate.getHours()
    ) {
      backgroundContainer.innerHTML = `<img src=./images/skies/${conditionString}.jpg alt=${conditionString} />`
    } else {
      backgroundContainer.innerHTML = `<img src=./images/skies/${conditionString}-night.jpg alt=${conditionString} />`
    }

    cityInput.placeholder = `${city}`
    countryTag.innerHTML = `<span>(${data.sys.country})</span>`
    weatherConditionTag.style.removeProperty('color')
    weatherConditionTag.innerText = ` ${weatherState}`
    weatherIconTag.innerHTML = `<img class="weather-icon" src=http://openweathermap.org/img/wn/${weather.icon}@2x.png alt=${condition.icon}/>`
    temperatureTag.innerHTML = `<span class="temperature">${Math.round(
      data.main.temp
    )}<sup>°</sup></span>`

    actualFeelTag.innerHTML = `Feels Like <strong>${Math.round(
      data.main.feels_like
    )}°C</strong>`
    humidityTag.innerHTML = ` ${data.main.humidity}%`
    cloudCoverTag.innerText = ` ${data.clouds.all}%`
    windSpeedTag.innerText = ` ${data.wind.speed.toFixed(1)} m/s`
    sunriseTag.innerText = sunriseTime
    weatherLocationTimeTag.innerText = weatherLocationTime
    sunsetTag.innerText = sunsetTime
  } else {
    backgroundContainer.innerHTML = `<img src=./images/skies/404.jpg alt="gray background" />`
    cityInput.placeholder = `${city}`
    countryTag.innerHTML = `<span>(${city})</span>`
    weatherConditionTag.innerText = `${city} ${response.statusText}`
    weatherConditionTag.style.setProperty('color', 'red')
    weatherConditionTag.style.fontSize = '1.0rem'
    temperatureTag.innerHTML = `<span class="temperature">-<sup>°</sup></span>`
    actualFeelTag.innerHTML = ' '
    humidityTag.innerHTML = ' - %'
    cloudCoverTag.innerText = ' - %'
    windSpeedTag.innerText = ' - m/s'
    sunriseTag.innerText = ' '
    sunsetTag.innerText = ' '
  }
}
