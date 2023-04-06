$(document).ready(handleReady);

let playerCount = 1;

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

  for (let i = 1; i <= playerCount; i++) {
    let playerGuess = {
      name: `Player ${i}`,
      guess: $(`#Player${i}`).val()
    }
    
    newGuesses.push(playerGuess);

    $(`#Player${i}`).val('')
  }

  console.log(newGuesses);
  $.ajax({
    method: 'POST',
    url: '/playerGuesses',
    data: newGuesses
  }).then(function(response){
    // Will need to build out function to bring DOM into sync
    getGuesses();
  }).catch(function(error){
    alert('issues with POST, try again later!')
  })

}// end submitGuesses


function getGuesses() {
  console.log('in getGuesses');
}