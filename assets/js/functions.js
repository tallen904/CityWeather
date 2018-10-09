/**
 * Creates a button for kicking off the test and adds it to the DOM.
 *
 * @param {HTMLElement} context  the parent element to add the button to
 * @param {Test}        test     the test to be executed
 * @returns {HTMLElement} the button added to the test
 */
function addButtonForTest(context, test, city) {
  let testButton = document.createElement('button');

  testButton.type = 'button';
  testButton.innerText = `Get the ${city} Weather`;
  testButton.onclick = () => test.run();

  context.appendChild(testButton);

  return testButton;
}
// Function will be called if the geolocation axios call is successful
function geolocateSuccess(results) {
  console.log(results);
  geoDiv.innerHTML = `<p>City: ${results.name}</p>
                      <p>Current Weather: ${results.weather[0].main}</p>
                      <p>Temperature(F): ${results.main.temp}</p>
                      <p>Humidity: ${results.main.humidity}%</p>
                      <p>Wind Speed: ${results.wind.speed}mph</p>`;
}
// Function will be called if the geolocation axios call is unsuccessful
function geolocateError(message) {
  geoDiv.innerHTML = `<h3>Error fetching results</h3><p>Status Code: ${message.data.cod} - ${message.data.message}</p>`;
}
// Async function that will run if the user accepts the geolocation services
// The function finds the weather data for the user's current location based on lat/lon
async function geolocate(url) {
  let awaitResponse;
  try {
    awaitResponse = await axios.get(url);
  } catch (error) {
    awaitResponse = error.response;
  }
  awaitResponse.data.cod === 200
    ? geolocateSuccess(awaitResponse.data)
    : geolocateError(awaitResponse);
}

// The following two functions are passed to navigator.geolocation.getCurrentPosition
// the geolocator decides which callback to use based on whether the user accepts geolocation services or not

// Geolocation on success callback
const success = pos => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=25e989bd41e3e24ce13173d8126e0fd6`;
  geolocate(url);
};
// Geolocation on error callback - should generally only run if the user declines the geolocation services
const error = error => {
  geoDiv.innerHTML = `Failed to get local weather. Reason: ${error.message}`;
};
