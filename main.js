import appid from './store.js';

let baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

let cityName = 'Mandeville'; // default city

window.addEventListener("load", (e) => {
    e.preventDefault();
    document.querySelector("input").value = cityName;
    getWeatherData(cityName)
});

document.querySelector("input").addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
    cityName = document.querySelector("input").value;
    getWeatherData(cityName);  
    }
});

document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    cityName = document.querySelector("input").value;
    getWeatherData(cityName);
});

function capitalizeWords(sentenceString) {
    let __tmpArray = [];
    const wordsArray = sentenceString.split(' ');
    wordsArray.forEach(word => {
        const capitalizedWord = word.slice(0, 1).toLocaleUpperCase() + word.slice(1)
       __tmpArray.push(capitalizedWord);
    });
    return __tmpArray.join(' ');
}

async function getWeatherData(city) {
    const url = baseApiUrl + 'q=' + city + '&units=metric&appid=' + appid;
    let response = await fetch(url);
    const responseStatus = response.status;
    if (responseStatus === 200){
        const data = await response.json();
            const weather = data.weather[0];
            let weatherState = weather.description;
            const conditionString = weather.main.toLowerCase();
            weatherState = capitalizeWords(weatherState);
            const localeTZ = new Date().getTimezoneOffset()/60;
            const weatherTZ = data.timezone/3600;
            const sunrise = new Date((data.sys.sunrise * 1000) + ((localeTZ + weatherTZ) * 3600000));
            const sunset = new Date((data.sys.sunset * 1000) + ((localeTZ + weatherTZ) * 3600000));

            document.querySelector(".bg-div").innerHTML = `<img src=./images/skies/${conditionString}.jpg alt=${conditionString} />`;
            document.querySelector("#condition").innerText = ` ${weatherState}`; 
            document.querySelector(".country").innerHTML = `<span>(${data.sys.country})</span>`;
            document.querySelector("#weather-icon").innerHTML = `<img class="weather-icon" src=http://openweathermap.org/img/wn/${weather.icon}@2x.png alt=${condition.icon}/>`
            document.querySelector("#temperature").innerHTML = `<span class="temperature">${Math.round(data.main.temp)}<sup>°</sup></span>`;
            
            document.querySelector("#feels-like").innerHTML = `Feels Like <strong>${Math.round(data.main.feels_like)}°C</strong>`;           
            document.querySelector("#humidity").innerHTML = ` ${data.main.humidity}%`;
            document.querySelector("#cloud-cover").innerText = ` ${data.clouds.all}%`;
            document.querySelector("#wind").innerText = ` ${data.wind.speed.toFixed(1)} m/s`;
            document.querySelector("#sunrise").innerText = `${sunrise.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
            document.querySelector("#sunset").innerText = `${sunset.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
        }
        else {
        document.querySelector("#condition").innerText = `Data for ${city} was ${response.statusText}`;
        document.querySelector("#condition").style.color = "red";
        document.querySelector("#condition").style.fontSize = "1.0rem";
        document.querySelector(".bg-div").innerHTML = `<img src=./images/skies/gray.jpg alt="gray background" />`;
        document.querySelector(".country").innerHTML = `<span>(${city})</span>`;
        document.querySelector("#temperature").innerHTML = `<span class="temperature">0<sup>°</sup></span>`;
        document.querySelector("#feels-like").innerHTML = " ";
        document.querySelector("#humidity").innerHTML = "0%";
        document.querySelector("#cloud-cover").innerText = "0%";
        document.querySelector("#wind").innerText = "0 m/s";
        document.querySelector("#sunrise").innerText = " ";
        document.querySelector("#sunset").innerText = " ";
        }
};
    
