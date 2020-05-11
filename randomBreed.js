'use strict';

function getDogImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(response => {
      if (!response.ok) {
        throw "Request failed"
      }
      return response.json()
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//temporarily hide to troubleshoot 404 error
/*
//catch isn't always thrown due to built in error messages from the API
//this is just in case an error occurs somewhere else
function displayError() {
  console.log("display error ran");
  $('#js-display').replaceWith(`<h2>Can't find that breed.  Try Again</h2>`); 
}
*/

function displayResults(responseJson) {
  
  //check for error status
  if(responseJson.status === "error") {
    console.log("I got an error");
    //return error message and hide image placeholder
    $('#js-display').replaceWith(`<h2 id=js-display>${responseJson.message}. Try Again</h2>`);
    $('.results-img').replaceWith(`<img src="" class="results-img hidden">`);
  } else {
    console.log("SUCCESS!!!!!!");
    //return success message and random image from list
    //get random number from returned list
    let rnd = Math.floor(Math.random() * responseJson.message.length);
    $('#js-display').replaceWith(`<h2 id=js-display>Check out this dog</h2>`);
    $('.results-img').replaceWith(`<img src="${responseJson.message[rnd]}" class="results-img">`);
  }
  //display results
  $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let breed = $("#js-breed").val();
        getDogImage(breed);
    });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});