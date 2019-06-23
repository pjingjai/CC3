import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from './User.js'

class App extends React.Component {
    state = {
        image: '',
        email: '',
        gender: '',
        name: ''
    }


  click = (e) => {
    console.log(e);
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(jsonObj => {
        const user = jsonObj.results[0];
        this.setState({
          image: user.picture.large,
          email: user.email,
          gender: user.gender,
          name: Object.values(user.name).join(' ')
        });
      });
        
  }

  render () {
    return (
      <div className="App">
        <User 
          image= {this.state.image}
          email= {this.state.email}
          gender= {this.state.gender}
          name= {this.state.name}
        />
        <button onClick={(e) => {this.click()}}>Generate User</button>
      </div>
    );
  }
}

export default App;
