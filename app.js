//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//8794eefc8598087b65c24ed58b48516e

const weatherApi = {
  key: "8794eefc8598087b65c24ed58b48516e",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
//Event listener function on keypress

const searchInputBox = document.getElementById("input-box");

searchInputBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    
  }
});

//Get weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&&units=metric`)
    .then((weather) => {
       if(weather.ok){
        document.querySelector('.weather-body').style.display = "block";
      } 
       
      return weather.json();
     
    })
    .then(shpwWeatherReport)   
}

//Show Weather Report
function shpwWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min) / ${Math.ceil(weather.main.temp_min)}&deg;C (max) `;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let toDayDate = new Date();
  date.innerText = dateManage(toDayDate);

  if(weatherType.textContent == 'Clear'){
    document.body.style.backgroundImage = "url('images/clear.jpg')"
  }else if(weatherType.textContent == 'Clouds'){
    document.body.style.backgroundImage = "url('images/cloud.jpg')"
  }else if(weatherType.textContent == 'Haze'){
    document.body.style.backgroundImage = "url('images/cloud.jpg')"
  }else if(weatherType.textContent == 'Rain'){
    document.body.style.backgroundImage = "url('images/rain.jpg')"
  }else if(weatherType.textContent == 'Snow'){
    document.body.style.backgroundImage = "url('images/snow.jpg')"
  }else if(weatherType.textContent == 'Thunderstrom'){
    document.body.style.backgroundImage = "url('images/thunderstrom.jpg')"
  }
}

//Date Manage

function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Mondat",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
