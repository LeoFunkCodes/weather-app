const table = document.querySelector("tbody")
const rows = table.rows

function gotLocation(pos) {
    console.log("location saved...");
    
    let weathercells = rows[1].children;
    let highcells = rows[2].children;
    let lowcells = rows[3].children;

    loadWeather(pos);
}

function loadWeather(pos, tableItems) {
    console.log("loading weather...");

    // temporary weather object instead of loading real weather
    const weather = {
        location: {
            city: "Stockholm",
            country: "Sweden"
        },
        current: {
            weather: "Sunny",
            temperature: "19",
            season: "Summer",
            month: "June"
        },

        forecast: [
            {
                day: "Today",
                weather: "Sunny",
                high: "22",
                low: "15"
            },
            {
                day: "Tomorrow",
                weather: "Cloudy",
                high: "18",
                low: "12"
            },
            {
                day: "Wednesday",
                weather: "Rainy",
                high: "16",
                low: "11"
            }
        ]
    }

    console.log("weather loaded...")
    displayWeather(weather)
}

function displayWeather(weather) {
    //display weather
}

navigator.geolocation.getCurrentPosition(gotLocation);
