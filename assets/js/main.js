'use strict';
// Target the div that will contain the generated buttons for getting weather data
const buttonContainer = document.getElementsByClassName('button-container')[0];
// Target the form the user inputs city names into to generate buttons for finding weather data in that city
const cityForm = document.querySelector('#city-form');
// Target the div that will hold our automatically generated local weather data
const geoDiv = document.querySelector('#geolocation-weather');

// When submitting the city form, create a new city button
cityForm.onsubmit = e => {
  // Prevent the default page-refresh behavior of a form
  e.preventDefault();
  const cityInput = document.querySelector('#city');
  const newCity = cityInput.value;
  const test = new Test(newCity);
  // If the user leaves the input blank or only enters one letter, alert them to enter a valid city
  if(newCity.length < 2){
    alert('Please enter a city to search for!')
  }
  addButtonForTest(buttonContainer, test, newCity);
  cityInput.value = '';
};

// Append a button on pageload that checks the weather in Brentwood.
addButtonForTest(buttonContainer, new Test('Brentwood'), 'Brentwood');

// Ternary expression that will return true if the user's browser supports geolocation services
// Will return false if the user's browser does NOT support geolocation services
// This will run automatically before the user is even prompted to provide their location
navigator.geolocation ? navigator.geolocation.getCurrentPosition(success, error) :
document.querySelector('#geolocation-weather').innerHTML = 'Sorry, geolocation is not supported in your browser.';
