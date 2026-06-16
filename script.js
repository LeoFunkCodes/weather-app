const table = document.querySelector("tbody")
const rows = table.rows
const currentWeather = document.querySelector("#weather");
const currentTemperature = document.querySelector("#temperature");
let position;

let weatherCells = rows[1].children;
let highCells = rows[2].children;
let lowCells = rows[3].children;

function gotLocation(pos) {
    console.log("location saved...");
    
    position = pos;
    loadWeather();
}

function loadWeather() {
    console.log("loading weather...");

    // temporary weather object instead of loading real weather
    const weather = {
        location: {
            city: "Stockholm"
        },
        current: {
            weather: "Sunny",
            temperature: 19
        },

        forecast: [
            {
                day: "Today",
                weather: "Sunny",
                high: 22,
                low: 15
            },
            {
                day: "Tomorrow",
                weather: "Cloudy",
                high: 18,
                low: 12
            },
            {
                day: "Wednesday",
                weather: "Rainy",
                high: 16,
                low: 11
            }
        ]
    }

    console.log("weather loaded...")
    displayWeather(weather)
}

function displayWeather(weather) {
    // current weather
    currentWeather.textContent = weather.current.weather;
    currentTemperature.textContent = weather.current.temperature + " degrees";

    // weather table
    rows[0].children[3].textContent = weather.forecast[2].day;

    rows[1].children[1].textContent = weather.forecast[0].weather;
    rows[1].children[2].textContent = weather.forecast[1].weather;
    rows[1].children[3].textContent = weather.forecast[2].weather;

    rows[2].children[1].textContent = weather.forecast[0].high;
    rows[2].children[2].textContent = weather.forecast[1].high;
    rows[2].children[3].textContent = weather.forecast[2].high;

    rows[3].children[1].textContent = weather.forecast[0].low;
    rows[3].children[2].textContent = weather.forecast[1].low;
    rows[3].children[3].textContent = weather.forecast[2].low;
}

navigator.geolocation.getCurrentPosition(gotLocation);
