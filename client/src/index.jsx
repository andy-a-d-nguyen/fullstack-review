import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`, typeof term);
    // send ajax POST to /repos
    var data = {username: term};
    $.ajax('/repos', {
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      error: (req, err) => {
        console.log(err);
      },
      success: (res, success, req) => {
        console.log(success);
      }
    })
    // axios.post('/repos', {
    //   username: term
    // })
    //   .then(res => {console.log(res)})
    //   .catch(err => {console.log(err)});
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));