const apiKey = `8ed725c841eb6ef5e56bf9531ac155f5`;
const form = document.querySelector("#form");
const input = document.querySelector("#city_input");
const image = document.querySelector(".weather_image");
const message = document.querySelector(".message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let cityInput = input.value.trim().replace(" ", "");
    
    if (cityInput) {
        try {
            const data = await getData(cityInput);
            displayWeatherData(data);
        }
        catch (err) {
            displayError('Failed to get data. Try again')
        }
    }
    else {
        displayError('Enter a city');
    }
});

/// call api
async function getData(cityInput) {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    let response = await fetch(baseUrl);
    return await response.json();
}

/// display weather data
const cityName = document.querySelector(".city");
const tempData = document.querySelector(".temp");
const weatherName = document.querySelector(".weather_name");
const pressureData = document.querySelector(".pressure");
const humidityData = document.querySelector(".humidity_percentage");
const windData = document.querySelector(".wind");

function displayWeatherData(data) {
    const weather = {
        name : city, 
        main : { temp, humidity, pressure },
        wind : { speed },
        weather : [{ main, icon }],
        timezone : timezone
    } =  data;

    // show data to display
    cityName.textContent =  city;
    tempData.textContent =  `${(temp - 273.15).toFixed(1)}°C`;
    weatherName.textContent = main;
    humidityData.textContent = `${humidity} %`;
    pressureData.textContent = `${pressure} hPa`;
    windData.textContent = `${speed} m/s`;

    // weather emoji
    if (icon) {
        image.src = `http://openweathermap.org/img/wn/${icon}.png`;
    }

    // show local time
    const showLocalTime = document.querySelector(".local_time");
    const date = new Date();
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime +  (timezone * 1000));
    showLocalTime.textContent = localTime.toLocaleTimeString();
}

/// display error
function displayError(err) {
    message.style.display = "block";
    message.textContent = err;
}

/// remove error
input.addEventListener("input", () => {
    message.textContent = "";
    message.style.display = "none";
});