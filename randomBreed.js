'use strict';

function getDogImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => displayError());
}

//catch isn't always thrown due to built in error messages from the API
//this is just in case an error occurs somewhere else
function displayError() {
  $('#js-display').replaceWith(`<h2>Can't find that breed.  Try Again</h2>`);  
}

function displayResults(responseJson) {
  //get random number from returned list
  let rnd = Math.floor(Math.random() * responseJson.message.length);
  
  //check for error status
  if(responseJson.status === "error") {
    console.log("I got an error");
    //return error message and hide image placeholder
    $('#js-display').replaceWith(`<h2 id=js-display>${responseJson.message}. Try Again</h2>`);
    $('.results-img').replaceWith(`<img src="" class="results-img hidden">`);
  } else {
    console.log("SUCCESS!!!!!!");
    //return success message and random image from list
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