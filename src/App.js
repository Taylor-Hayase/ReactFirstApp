import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios';

class App extends Component {
  state = {
    characters: [],
  }

  componentDidMount() {
   axios.get('http://localhost:5000/users')
    .then(res => {
      const characters = res.data.users_list;
      this.setState({ characters });
    })
    .catch(function (error) {
      //Not handling the error. Just logging into the console.
      console.log(error);
    });
  }

  makePostCall(character){
   return axios.post('http://localhost:5000/users', character)
    .then(function (response) {
      console.log(response);
      return (response.data);
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  }	

  makeDeleteCall(character){
  	var url = 'http://localhost:5000/users'
  	console.log(url.concat('/', character.id))
   	return axios.delete(url.concat('/', character.id), character)
    .then(function (response) {
      console.log(response);
      return (true);
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  }	

  removeCharacter = index => {
    const {characters } = this.state

    this.makeDeleteCall(characters[index]).then (callResult => {
    	this.setState({ characters : [callResult] });
    });
  }

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
        this.setState({ characters: [...this.state.characters, callResult] });
   	});
  }

  render() {
     const {characters} = this.state;

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App
