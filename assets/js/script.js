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

renderDateTime();
perMinuteInterval();

