import React from 'react';

// create a method to render all repos received from database
    // for each repo received
      // render a div
const RepoList = (props) => {
  let repos = props.repos;

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <ul>
        {repos.map((repo, index) => {
          console.log('rendering each repo', repo);
          return (
            <li key = {index}>{repo.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default RepoList;