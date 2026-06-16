const table = document.querySelector("tbody")
const rows = table.rows
const currentWeather = document.querySelector("#weather");
const currentTemperature = document.querySelector("#temperature");
let latitude;
let longitude;

let weatherCells = rows[1].children;
let highCells = rows[2].children;
let lowCells = rows[3].children;

async function gotLocation(pos) {
    console.log("location saved...");
    
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    await loadWeather();
}

async function loadWeather() {
    console.log("loading weather...");
    const weather = await getWeather();

    const formattedWeather = {
        current: {
            weather: getWeatherFromCode(weather.current.weather_code),
            temperature: Math.round(weather.current.temperature_2m)
        },

        forecast: [
            {
                day: "Today",
                weather: getWeatherFromCode(weather.daily.weather_code[0]),
                high: Math.round(weather.daily.temperature_2m_max[0]),
                low: Math.round(weather.daily.temperature_2m_min[0])
            },
            {
                day: "Tomorrow",
                weather: getWeatherFromCode(weather.daily.weather_code[1]),
                high: Math.round(weather.daily.temperature_2m_max[1]),
                low: Math.round(weather.daily.temperature_2m_min[1])
            },
            {
                day: getWeekdayIn(2),
                weather: getWeatherFromCode(weather.daily.weather_code[2]),
                high: Math.round(weather.daily.temperature_2m_max[2]),
                low: Math.round(weather.daily.temperature_2m_min[2])
            }
        ]
    }

    console.log("weather loaded...")
    displayWeather(formattedWeather)
}

async function getWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        return await response.json();

    } catch (error) {
        console.error(error.message);
    }
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

function getWeatherFromCode(code) {
    let codes = [
        [0, "Sunny", "☀️", "🌙"],
        [1, "Mainly Sunny", "🌤️", "🌙"],
        [2, "Partly Cloudy", "⛅", "☁️"],
        [3, "Cloudy", "☁️", "☁️"],
        [45, "Foggy", "🌫️", "🌫️"],
        [48, "Rime Fog", "🌫️", "🌫️"],
        [51, "Light Drizzle", "🌦️", "🌧️"],
        [53, "Moderate Drizzle", "🌧️", "🌧️"],
        [55, "Dense Drizzle", "🌧️", "🌧️"],
        [56, "Light Freezing", "🥶", "🥶"],
        [57, "Dense Freezing", "🥶", "🥶"],
        [61, "Light Rain", "🌦️", "🌧️"],
        [63, "Moderate Rain", "🌧️", "🌧️"],
        [65, "Heavy Rain", "⛈️", "⛈️"],
        [66, "Freezing Rain", "🧊", "🧊"],
        [67, "Heavy Freezing", "🧊", "🧊"],
        [71, "Light Snow", "🌨️", "🌨️"],
        [73, "Moderate Snow", "❄️", "❄️"],
        [75, "Heavy Snow", "❄️", "❄️"],
        [77, "Snow Grains", "🌨️", "🌨️"],
        [80, "Light Showers", "🌦️", "🌧️"],
        [81, "Moderate Showers", "🌧️", "🌧️"],
        [82, "Violent Showers", "⛈️", "⛈️"],
        [85, "Snow Showers", "🌨️", "🌨️"],
        [86, "Heavy Snow", "❄️", "❄️"],
        [95, "Thunderstorm", "🌩️", "🌩️"],
        [96, "Light Hail", "⛈️", "⛈️"],
        [99, "Heavy Hail", "⛈️", "⛈️"]
    ];

    let current = codes.find(row => row[0] === code) || [0, "Sunny", "☀️", "🌙"];
    const isDay = new Date().getHours() >= 7 && new Date().getHours() < 19;

    if(isDay) {
        return(`${current[1]} ${current[2]}`);
    } else {
        return(`${current[1]} ${current[3]}`);
    }
}

function getWeekdayIn(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toLocaleDateString("en-US", {
        weekday: "long"
    });
}

navigator.geolocation.getCurrentPosition(gotLocation);
