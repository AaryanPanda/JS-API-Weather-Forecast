//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.


const currentDate = new Date();
const fullDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(currentDate);

const dateElem = document.getElementById('date');
dateElem.innerText = fullDate;

const API_KEY = '2b2395dc2bc665f7435ef133d54697c9';

const inputLocationForm = document.getElementById('input');

const infoSection = document.getElementById('quote');
const loader = document.getElementById('loader');
const detailSection = document.getElementsByClassName('details')[0];

inputLocationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  infoSection.classList.add('hidden');
  loader.classList.remove('hidden');
  detailSection.classList.add('hidden');

  const formData = new FormData(inputLocationForm);
  const placeInput = formData.get('location-data');
  getLocationData(placeInput);
});

function getLocationData(location) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => getWeatherData(data[0].lat, data[0].lon))
    .catch((err) => console.error(err));
}

function getWeatherData(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

function updateUI(data) {
  loader.classList.add('hidden');
  detailSection.classList.remove('hidden');

  let place = data.name;
  let country = data.sys.country;
  let temp = data.main.temp - 273.15;
  let tempMin = data.main.temp_min - 273.15;
  let tempMax = data.main.temp_max - 273.15;
  let tempDesc = data.weather[0].description;

  const placeNameElem = document.getElementById('place');
  placeNameElem.innerText = place;

  const countryNameElem = document.getElementById('country');
  countryNameElem.innerText = country;

  const tempElem = document.getElementById('temp');
  tempElem.innerText = temp.toFixed(1) + ' °C';

  const tempLowElem = document.getElementById('low');
  tempLowElem.innerText = tempMin.toFixed(1) + ' °C';

  const tempHighElem = document.getElementById('high');
  tempHighElem.innerText = tempMax.toFixed(1) + ' °C';

  const descriptionElem = document.getElementById('description');
  descriptionElem.innerText = tempDesc;
}
