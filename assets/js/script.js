// Current date and time variables
var currentDateEl = document.getElementById('date-time');
var currentDate;

// Render date and time in the heading
function renderDateTime() {
    currentDate = moment().format('LLLL');
    currentDateEl.textContent = currentDate;
};

// Update the displayed date and time every minute
function perMinuteInterval () {
    var currentSeconds = new Date().getSeconds();
    if (currentSeconds == 0) {
        setInterval(renderDateTime, 60000);
    } else {
        setTimeout(function() {
            perMinuteInterval();
        }, (60000 - currentSeconds*1000));
    }
    renderDateTime();
};

perMinuteInterval();

// API Information
var APIKey = '8a622b07b60d853679b1d9c7d914148d';
var rawCityData = {};
var currentInfo = {};
var futureInfo = {};

// User Input and other variables
var cityInput = document.getElementById('search-input');
var submitBtn = document.getElementById('search-btn');
var cityHistory = document.getElementById('search-history');
var resultContentEl = document.getElementById('result-content');
var resultTextEl = document.getElementById('result-text');

var today = document.getElementById('current-date');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentIcon = document.getElementById('current-weather-icon');

var date1 = document.getElementById('date-1');
var temp1 = document.getElementById('temp-1');
var wind1 = document.getElementById('wind-1');
var humidity1 = document.getElementById('humidity-1');
var icon1 = document.getElementById('icon-1');

var date2 = document.getElementById('date-2');
var temp2 = document.getElementById('temp-2');
var wind2 = document.getElementById('wind-2');
var humidity2 = document.getElementById('humidity-2');
var icon2 = document.getElementById('icon-2');

var date3 = document.getElementById('date-3');
var temp3 = document.getElementById('temp-3');
var wind3 = document.getElementById('wind-3');
var humidity3 = document.getElementById('humidity-3');
var icon3 = document.getElementById('icon-3');

var date4 = document.getElementById('date-4');
var temp4 = document.getElementById('temp-4');
var wind4 = document.getElementById('wind-4');
var humidity4 = document.getElementById('humidity-4');
var icon4 = document.getElementById('icon-4');

var date5 = document.getElementById('date-5');
var temp5 = document.getElementById('temp-5');
var wind5 = document.getElementById('wind-5');
var humidity5 = document.getElementById('humidity-5');
var icon5 = document.getElementById('icon-5');

date1.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
date2.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
date3.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
date4.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
date5.textContent = moment().add(5, 'days').format('MM/DD/YYYY');

var previousSearch = [];
var cityName;

function pushCityHistory () {
    var newLi = document.createElement('li');
    var historyBtn = document.createElement('button');
    cityHistory.appendChild(newLi);
    newLi.appendChild(historyBtn);
    cityName = cityInput.value;
    previousSearch.push(cityName);
    historyBtn.textContent = cityName;
    localStorage.setItem("city", JSON.stringify(previousSearch));
    localStorage.getItem("city");
}

function printResults (resultObj) {
    console.log(resultObj);


}

function searchApi(cityName) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={APIKey}';

    fetch(weatherUrl)
        .then(function(response){
            if (!response.ok) {
                alert('Please enter a valid city');
                throw response.json();
            }

        return response.json();
    })
    .then(function(weatherRes){

        resultTextEl.textContent = weatherRes.cityName;

        console.log(weatherRes);

        if (!weatherRes.results.length) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results were found, please search again.</h3>';
        } else {
            resultContentEl.textContent = '';
            printResults(weatherRes.results);
        }
    })
}

function searchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.getElementById('search-input').value;

    if(!searchInputVal) {
        console.error('Need city name to search');
        return;
    }

    searchApi(searchInputVal);
}

submitBtn.addEventListener('submit', searchFormSubmit);