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
  url: {type: String, unique: true}, // html_url
  fullName: {type: String, unique: true}, // full_name
  name: String, // name
  owner: String, // owner.login
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
    url: repo.html_url,
    fullName: repo.full_name,
    name: repo.name,
    owner: repo.owner.login,
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

// create a method to find the top 25 repos sorted by forks count
// let find = (username) => {
//   Repo.find({owner: username}).sort({forksCount: -1}).limit(25).exec((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// }

let find = (username, callback) => {
  Repo.find({owner: username}, (error, results) => {
    if(error) {
      console.log('cannot get data from database');
    } else {
      callback(null,results);
    }
  }).sort({forksCount: -1}).limit(25);
}

// save(testData[0]);
// find();

module.exports.save = save;
module.exports.find = find;