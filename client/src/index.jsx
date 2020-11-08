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
      repos: [],
      username: ''
    }

  }

  componentDidMount() {

  }

  renderRepos(term) {
    this.setState({
      username: term
    })
    $.ajax('/repos', {
      type: 'GET',
      data: term,
      contentType: 'application/text',
      error: (req, err) => {
        console.log('ajax get error' ,err);
      },
      success: (res) => {
        console.log('ajax get response', res);
        // console.log('ajax GET status: ', status);
        this.setState({
          repos: res
        })
        console.log(this.state);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched and is of type: `, typeof term);
    // send ajax POST to /repos

    var data = {username: term};
    if (term !== this.state.username) {
      $.ajax('/repos', {
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        error: (req, err) => {
          console.log(err);
        },
        success: (res, status, req) => {
          console.log('ajax POST status: ', status);
        }
      })
    }
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
      <Search onSearch={this.search.bind(this)} render={this.renderRepos.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));