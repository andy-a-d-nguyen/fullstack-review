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
      <table>
        <tbody>
        {repos.map((repo, index) => {
          console.log('rendering each repo', repo);
          return (
            <tr>
              <td>{repo.fullName}</td>
              <td><a href = {repo.url}>{repo.name}</a></td>
              <td>{repo.owner}</td>
              <td>{repo.createdAt}</td>
              <td>{repo.forksCount}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default RepoList;