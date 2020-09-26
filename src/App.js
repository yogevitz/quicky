import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import questions from './questions.json';

const keys = Object.keys(questions);

class App extends React.Component {
  state = {};

  nextQuestion = () => {
    const rndIndex = Math.floor(Math.random() * keys.length);
    const question = questions[rndIndex];
    this.setState({ question });
  };

  render() {
    const { question } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div dir="rtl">
            <p>{question}</p>
          </div>
          <Button onClick={() => this.nextQuestion()} variant="contained" color="primary">
            Next!
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
