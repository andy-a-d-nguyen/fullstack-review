const {getReposByUsername} = require('../helpers/github.js');
const {save} = require('../database/index.js');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());

// app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // console.log(req);
  res.send('Hello POST request');

  // use getReposByUsername to get repos
  // for each repo in response
    // use save to create a document and store in database
  let username = req.body.username;
  getReposByUsername(username, (user) => {
    console.log(user.data, '\n', typeof user.data);

    let repos = user.data;

    repos.forEach(repo => {

      save(repo); // the save method formats the data already so we only need to call it to save the data to the database
    });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('Hello GET request');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

