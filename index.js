'use strict';

function getDogImage(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //remove previous results
  $('.results').empty();
   
  //add more images
  for(let i = 0; i < responseJson.message.length; i++) {
    $( ".results" ).append(`<img src="${responseJson.message[i]}" class="results-img">`);
  }

  //display the results section
  $('h2').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let numberOfDogs = $("#js-numberOfDogs").val();
        
        if(numberOfDogs > 0 && numberOfDogs <= 50) {
            getDogImage(numberOfDogs); 
        } 
        else if(num <= 0) {
            getDogImage(3);
        } else {
            getDogImage(50);
        }
    });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});