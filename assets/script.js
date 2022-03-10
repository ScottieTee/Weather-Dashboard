let OwmApi = "7061a0d7994071a5b1a2eb70e8d0765f";
var usApi = "R_fPrwXAPD_TNN3gw5mXZOhXQ52yQ8aPTLvMPRe3U4Q";
let CurrentCity = "";
let lastCity = "";
var city = $('search-city').val();
var apiURL = "https://api.openweathermap.org/data/2.5/weather?=" + city + "&units=imperial" + "&APPID=" + owmApi;


// Use URLSearchParams to get URL parameters and check url for API key
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
var getUrlPar = function() {
    let urlPar = new URLSearchParams(window.location.search);
    if (urlPar.has('key')) {
        owmApi = urlPar.get('key');
    }
};

//current weather
var getCurrentWeather = function (event) {
    currentCity = city;
    let longitude;
    let latitude;
    //let apiURL = "https://api.openweathermap.org/data/2.5/weather?=" + city + "&units=imperial"
    // + "&APPID=" + owmApi;

     fetch(apiUrl).done(function(response) {
        saveCity(city);
        $('#search-error').text("");
        currentWeatherIcon="https://openwathermap.org/img/w/" + response.weather[0].icon + ".png";
        let UTCtime = response.dt;
        let timeOffset = response.timezone;
        let timeOffsetHours = timeOffset / 60 / 60;
        let currentMoment = moment.unix(UTCtime).utc().utcOffset(timeOffsetHours);
        renderCities();
        getBackgroundImage();
        getFiveDayForecast(event);
        $('header-text').text(response.name);
        let currentHTML = `
            <h3>Current Conditions<img src="${currentWeatherIcon}"></h3>
            <h6>${currentMoment.format("MM/DD/YY h:mma")} local time</h6>
            <br>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
            </ul>`;
        $('#current-weather').html(currentHTML);
        latitude = response.coord.lat;
        longitude = response.coord.lat;
    })
        .fail(function () {
            console.log("Current Weather API Error: try another city.");
            $('#search-error').text("City not found!");
        });
} 
