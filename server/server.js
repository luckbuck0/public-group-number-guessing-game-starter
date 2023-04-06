const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessArray = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.get('/playerGuesses', (req, res) => {
  console.log('GET /playerGuesses');

})

app.post('/playerGuesses', (req, res) => {
  console.log('POST /playerGuesses');

  let newGuesses = req.body;
  guessArray.push(newGuesses)

  res.sendStatus(201)
})



app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
