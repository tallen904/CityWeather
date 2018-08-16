'use strict';

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

// Create the Test and add a button to the UI for running the test
const buttonContainer = document.getElementsByClassName('button-container')[0];
const cityForm = document.querySelector('#city-form');
// When submitting the city form, create a new city button
cityForm.onsubmit = e => {
  // Prevent the default page-refresh behavior of a form
  e.preventDefault();
  const cityInput = document.querySelector('#city');
  const newCity = cityInput.value;
  const test = new Test(newCity);
  addButtonForTest(buttonContainer, test, newCity);
  cityInput.value = '';
};