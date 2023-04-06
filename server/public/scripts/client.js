$(document).ready(handleReady);

let playerCount = 1;

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit-Player-Count').on('click', submitPlayers)

}

function submitPlayers(event) {
  // Prevent reload of page on submit of form
  event.preventDefault();
  playerCount = $('#Player-Count').val();

  $('#Guess-Input').empty('');


  for (let i = 1; i <= playerCount; i++) {
    $('#Guess-Input').append(`
        <h3 class="row">Player ${i}
          <input id="Player${i}" placeholder="Guess">
        </h3>
    `)
  }

  $('#Guess-Input').append(`
    <div>
      <button id="Submit-Players-Guess">Submit Guesses</button>
    </div>
  `)

}