# Javascript Weather App

## Welcome 👋

Welcome to this Javascript weather app repository.

## The Inspiration

I came across a very well-crafted weather app built in Vue [Vue JS Weather App](https://dogukanbatal.github.io/vue-weather-app) by Dogukan Batal and thought of doing the same to hone my HTML, CSS and Javascript skills.

This weather app utilizes the [OpenWeather API](https://openweathermap.org/) and you will need to set up an account (it has a free tier) and get an API key to use with the app.

---

### Favicon

I used the sun icon from FreeIconsPNG site.
<a href="https://www.freeiconspng.com/img/8579" title="Image from freeiconspng.com"><img src="https://www.freeiconspng.com/uploads/sun-icon-22.png" width="32" alt="Download Sun Icon" /></a>

### Project Setup

- Sign up and create and API Key at [OpenWeatherMap](https://openweathermap.org/).
- Store your key in a javascript file such as store.js or env.js

`const apiKey = "YOUR_API_KEY";`
`export default apiKey;`

This is used in the main.js file following import:
`import apiKey from './store.js';`

## Description

The app takes city name query and returns information about weather conditions: temperature, feel, wind speed, sky condition, humidity, cloud cover, sunrise, sunset and actual time in that city. The background of the container div changes depending on the weather conditions and night and day. Images for the background are from [Unsplash.com](https://unsplash.com/). I have tried to have images to cover all possible conditions but I may have missed some.

You may also input the query string as City Name, State and Country (eg. San Francisco, US or San Francisco, CA, US)

## Use

Feel free to clone, fork and improve as you desire.

*==John Newman==*
