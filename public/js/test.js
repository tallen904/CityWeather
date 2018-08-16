'use strict';

class Test {
  constructor(city) {
    this.testResults = document.querySelector('#res');
    this.city = city;
    this.results = {};
  }

  // The async function will run until it hits the 'await' keyword, at which point
  // the function will pause until the await resolves before continuing it's execution
  async run() {
    console.log(new Date().toISOString(), '[Test]', 'Running the test');
    // TODO: Make the API call and handle the results
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&appid=25e989bd41e3e24ce13173d8126e0fd6`;
    let awaitResponse;
    // This try statement will test to make sure our axios call doesn't return an error
    // If it does, we will hit the catch statement and return an error to the user
    try {
      // This await statement will return a promise containing our response from the openweather API
      // which will then be passed to setResults (on success) or setError (on error)
      awaitResponse = await axios.get(url);
    } catch(error) {
      // The error object returned from the catch statement has a response property that
      // the browser does not make obvious. Had to do some StackOverflow research to find this out
      awaitResponse = error.response;
    }
    // If we get a status code of 200, display the results of the axios call to the user
    if(awaitResponse.data.cod === 200){
      this.setResults(awaitResponse.data);
      // If we get anything other than 200 (most likely 404), display the error message to the user
    } else {
      this.setError(awaitResponse);
    }
  }

  setError(message) {
    // TODO: Format the error
    console.log(message);
    this.testResults.innerHTML = message.status;
  }

  setResults(results) {
    // TODO: Format the results
    // document.querySelector('#res').innerHTML = JSON.stringify(results, null, 2);
    console.log(results);
    this.testResults.innerHTML = `<p>City: ${results.name}</p> <p>Current Weather: ${results.weather[0].main}</p>
                                  <p>Temperature(F): ${results.main.temp}</p> <p>Humidity: ${results.main.humidity}%</p>
                                  <p>Wind Speed: ${results.wind.speed}mph</p>`;
  }
}
