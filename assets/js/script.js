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

// Current weather variables
var today = document.getElementById('current-date');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentIcon = document.getElementById('current-weather-icon');

// Forecast weather variables
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
    // Create list and button element for the search history
    var newLi = document.createElement('li');
    var historyBtn = document.createElement('button');

    // Add the elements to the appropriate section
    cityHistory.appendChild(newLi);
    newLi.appendChild(historyBtn);

    // Set the values for the cityName to the input so we can add them to a previous search list
    cityName = cityInput.value;
    previousSearch.push(cityName);

    // Replace the text on the button to the current cityName and add classes to the button
    historyBtn.textContent = cityName;
    historyBtn.classList.add('btn', 'btn-secondary');

    // Save the cityName to local storage so we can pull it out later
    localStorage.setItem("city", JSON.stringify(previousSearch));
    localStorage.getItem("city");

    // Eventlistener for the button
    historyBtn.addEventListener('click', pastSearchHandler);
}

function pastSearchHandler(event) {
    cityInput = event.target.textContent;
    searchApi();
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
    .then(function(currentWData){

        resultTextEl.textContent = currentWData.cityName;

        console.log(currentWData);

        if (!currentWData.results.length) {
            console.log('No results found!');
            resultContentEl.innerHTML = '<h3>No results were found, please search again.</h3>';
        } else {
            resultContentEl.textContent = '';
            printCurrentResults(currentWData.results);
        }
    })

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={cityName}&limit=1&appid={APIKey}';

    fetch(forecastUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            pushForecast(data);
        })
}

function printCurrentResults (data) {
    console.log(data);
    today.textContent = moment().format('MM/DD/YYYY');
    currentTemp.textContent = data.main.temp + '°F'
    currentWind.textContent = data.wind.speed + ' MPH';
    currentHumidity.textContent = data.main.humidity + '%';
    var currentIconID = data.weather[0].icon;
    var currentIconURL = 'https://openweathermap.org/img/w/' + currentIconID + '.png';
    currentIcon.setAttribute('src', currentIconURL);
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

function init () {
    var savedHistory = JSON.parse(localStorage.getItem("city"));

    if (savedHistory !== null) {
        previousSearch = savedHistory;
    }
    pushHistoryBtnOnLoad();
    resultContentEl.dataset.state = 'hidden';
    resultdisplay();
}

function pushHistoryBtnOnLoad () {
    for (var i = 0; i < previousSearch.length; i++) {
        var 
    }
}