const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// pending connection to the fetcher database running on localhost
const testData = require('../datatest.js');

const db = mongoose.connection;
// create a connection / mongoose instance / connection constructor
db.on('error', console.error.bind(console, 'mongoose connection error:'));
// event listener listening for error
db.once('open', () => {
  console.log('mongoose connection success');
});
// event listener returning a Promise

let repoSchema = mongoose.Schema({
  name: String, // name
  owner: String, // owner.login
  url: String, // html_url
  createdAt: Date, // created_at
  forksCount: Number //forks_count
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // create a document for each repo
  // map properties in each repo to appropriate keys in schema
  let fetchedRepo = new Repo({
    name: repo.name,
    owner: repo.owner.login,
    url: repo.html_url,
    createdAt: repo.created_at,
    forksCount: repo.forks_count
  });

  // save each document to the database
  fetchedRepo.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success saving fetched repo');
    }
  });
}

save(testData[0]);

module.exports.save = save;