let sliderContent = document.querySelector(".slider-content");
let searchInput = document.querySelector(".search-input");
let weatherDetails = document.querySelector(".weather-details");
let searchBtn = document.querySelector(".search-btn");
let leftBtn = document.querySelector(".left-btn");
let rightBtn = document.querySelector(".right-btn");


let allData = [];
let forecastData = [];
let myHttpReq = new XMLHttpRequest();
myHttpReq.open("GET", "https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=cairo&days=3");
myHttpReq.send();
myHttpReq.addEventListener("readystatechange", function () {
    if (myHttpReq.readyState == 4 && myHttpReq.status == 200) {
        allData = JSON.parse(myHttpReq.response);
        forecastData = JSON.parse(myHttpReq.response).forecast.forecastday;
        console.log(allData);
        console.log(forecastData)
        display(allData, 0)
    }
});

let searchData = [];
searchBtn.addEventListener("click", function () {
    myHttpReqSearch = new XMLHttpRequest();
    myHttpReqSearch.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=${searchInput.value}&days=3`);
    myHttpReqSearch.send();
    myHttpReqSearch.addEventListener("readystatechange", function () {
        if (myHttpReqSearch.readyState == 4 && myHttpReqSearch.status == 200) {
            searchData = JSON.parse(myHttpReqSearch.response);
            allData = searchData
            forecastData = JSON.parse(myHttpReqSearch.response).forecast.forecastday;
            console.log(searchInput.value)
            display(allData, 0);
            clear();
        }
        else {
            sliderContent.innerHTML = `<div class="alert alert-danger text-center"><h1>Not found</h1></div>`
            clear();
        }
    });
})

function clear() {
    searchInput.value = "";
}


function display(arr, dayIndex) {
    let divs = `
                        <div class="container">
                            <div class="row align-items-center pt-3">
                                <div class="col-xlg-2">
                                    <div class="temperature">
                                        <h1>${forecastData[dayIndex].day.maxtemp_c}<sup>o</sup></h1>
                                    </div>
                                </div>
                                <div class="col-xlg-2">
                                    <div class="city">
                                        <h2>${arr.location.name}</h2>
                                        <span class="date">${forecastData[dayIndex].date}</span>
                                    </div>
                                </div>
                                <div class="col-xlg-2">
                                    <div class="forecast-desc">
                                        <p>${forecastData[dayIndex].day.condition.text}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="main-temperature text-center">
                                <h1>${forecastData[dayIndex].day.maxtemp_c}<sup>o</sup>C</h1>
                                <p>Minimum temp: ${forecastData[dayIndex].day.mintemp_c}<sup>o</sup>C</p>
                            </div>
                        </div>
    
    `

    let weatherDetailsContent = `
                    <h5 class="weather-detail-title">Weather details</h5>
                    <div class="humidity-item mb-1">
                        <i class="fa-solid fa-droplet humidity-icon"></i>
                        <span>${forecastData[dayIndex].day.avghumidity}%</span>
                    </div>
                    <div class="wind-item mb-1">
                        <i class="fa-solid fa-wind wind-icon"></i>
                        <span>${forecastData[dayIndex].day.maxwind_kph} km/hour</span>
                    </div>
                    <div class="rain-item">
                        <i class="fa-solid fa-cloud-showers-heavy rain-icon"></i>
                        <span>${forecastData[dayIndex].day.daily_chance_of_rain}</span>
                    </div>
                    <hr class="text-start">
    `

    sliderContent.innerHTML = divs;
    weatherDetails.innerHTML = weatherDetailsContent;
}


let index = 0;
rightBtn.addEventListener("click", function () {
    if (index == 2) {
        index = 0;
        display(allData, index)
    } else {
        index++
        display(allData, index);
    }
})

leftBtn.addEventListener("click", function () {
    if (index == 0) {
        index = 2;
        display(allData, index)
    } else {
        index--
        display(allData, index);
    }
})