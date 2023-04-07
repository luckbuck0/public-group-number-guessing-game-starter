$(document).ready(handleReady);

let playerCount = 1;
let guessCount = 0;

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-Player-Count').on('click', submitPlayers)

  $('#Guess-Input').on('click', '#Submit-Players-Guess', submitGuesses)

}

// Function to create a new input field per player of the game.
function submitPlayers(event) {
  // Prevent reload of page on submit of form
  event.preventDefault();
  playerCount = $('#Player-Count').val();

  $('#Guess-Input').empty('');

  // Create a new guess input for each player
  for (let i = 1; i <= playerCount; i++) {
    $('#Guess-Input').append(`
        <h3 class="row">Player ${i}
          <input id="Player${i}" placeholder="Guess">
        </h3>
    `)
  }

  $('#Player-Count').val('');

  // Create 1 submit button for all player's guesses
  $('#Guess-Input').append(`
    <div>
      <button id="Submit-Players-Guess">Submit Guesses</button>
    </div>
  `)
}// end submitPlayers


function submitGuesses(event) {
  // Prevent reload of page on submit of form
  event.preventDefault();
  console.log('in submitGuesses');

  //loop through player guesses add to newGuesses Array
    //Guess = {name: `Player ${i})`, guess: $('#Player ${i}').val()}
  
  let newGuesses = [];

  guessCount++

  for (let i = 1; i <= playerCount; i++) {
    let playerGuess = {
      name: `Player ${i}`,
      guess: $(`#Player${i}`).val()
    }
    
    newGuesses.push(playerGuess);

    $(`#Player${i}`).val('')

    $.ajax({
      method: 'POST',
      url: '/playerGuesses',
      data: playerGuess
    }).then(function(response){
      // Will need to build out function to bring DOM into sync
      // getGuesses();
    }).catch(function(error){
      alert('issues with POST, try again later!')
    })
  }

  getGuesses();
  console.log(newGuesses);


}// end submitGuesses


function getGuesses() {
  console.log('in getGuesses');

  $('#Guess-Results').append(`
    <div id="guessTracker${guessCount}">
      <p>Guess # ${guessCount}</p>
    </div>
  `)

  $.ajax({
    method: 'GET',
    url: '/playerGuesses'
  }).then(function(guessResponse){
    for(let guess of guessResponse){
      console.log(`name -->${guess.name} guess -->${guess.guess}`);
      $(`#guessTracker${guessCount}`).append(`
          <li>${guess.name} - ${guess.guess}</li>
      `)
    }// end for...of loop
  }) //previousRound()
}
/*
function previousRounds(){
  $.ajax({
    method: 'Get'
    url: blah
  }).then(function(roundsrespon){
    for (let blj of bbl){
      $('#dfdaf').append(`
      previous values`)
      
      clear out the values of the array
    }
  })
}
*/