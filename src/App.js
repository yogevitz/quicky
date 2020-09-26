import React from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Drawer, Typography } from '@material-ui/core';
import questions from './questions.json';

const keys = Object.keys(questions);
const colors = ['#34232f', '#3E65F0', '#A00336', '#4F7026', '#73513C'];

class App extends React.Component {
  state = {
    inGame: false,
    about: false,
    color: colors[0],
  };

  start = () => {
    this.setState({ inGame: true });
    this.next();
  };

  next = () => {
    const rndKeyIndex = Math.floor(Math.random() * keys.length);
    const question = questions[rndKeyIndex];
    this.setState({ question });
  };

  toggleAbout = () => {
    const { about, color } = this.state;
    let rndColorIndex, newColor;
    if (about) {
      rndColorIndex = Math.floor(Math.random() * colors.length);
      newColor = colors[rndColorIndex];
    }
    this.setState({ about: !about, color: about ? newColor : color });
  };

  render() {
    const { inGame, question, about, color } = this.state;
    return (
      <div className="App">
        <Drawer anchor="bottom" open={about} onClose={() => this.toggleAbout()}>
          <div dir="rtl" className="about">
            <Typography variant="subtitle1">
              יש שאלות
            </Typography>
            <Typography variant="subtitle1">
              צריך לענות מהר
            </Typography>
            <Typography variant="subtitle1">
              אסור להתמהמה
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              אסור לחזור על תשובות
            </Typography>
            <Typography variant="subtitle1">
              <div dir="ltr">© GangBang Productions</div>
            </Typography>
          </div>
        </Drawer>
        <header className="App-header" style={{ backgroundColor: color }}>
          <img
            height="197px"
            width="300px"
            src={logo}
            className="logo"
            alt="logo"
          />
          <div>
            {inGame ? (
              <React.Fragment>
                <div dir="rtl" className="question">
                  <p>{question}</p>
                </div>
                <Button onClick={() => this.next()} variant="contained" color="secondary" size="large">
                  Next
                </Button>
              </React.Fragment>
            ) : (
              <Button onClick={() => this.start()} variant="outlined" color="secondary" size="large">
                Start
              </Button>
            )}
            <p>
              <Button onClick={() => this.toggleAbout()}>
                WTF
              </Button>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
