// Current date and time variables
var currentDateEl = document.getElementById('date-time');
var currentDate;
var today;

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
var resultTextEl = document.getElementById('resutl-text');

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