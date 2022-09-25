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

var previousSearch = [];
var city;
var cityName;

function pushCityHistory () {
    var newLi = document.createElement('li');
    var historyBtn = document.createElement('button');
    cityHistory.appendChild(newLi);
    newLi.appendChild
}