import React from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Drawer, Typography } from '@material-ui/core';
import QUESTIONS from './questions.json';

const KEYS = Object.keys(QUESTIONS);
const COLORS = ['#34232f', '#3E65F0', '#A00336', '#4F7026', '#73513C'];

class App extends React.Component {
  state = {
    inGame: false,
    about: false,
    color: COLORS[0],
  };

  start = () => {
    this.setState({ inGame: true });
    this.next();
  };

  next = () => {
    const rndKeyIndex = Math.floor(Math.random() * KEYS.length);
    const question = QUESTIONS[rndKeyIndex];
    this.setState({ question });
  };

  toggleAbout = () => {
    const { about, color } = this.state;
    let rndColorIndex, newColor;
    if (about) {
      rndColorIndex = Math.floor(Math.random() * COLORS.length);
      newColor = COLORS[rndColorIndex];
    }
    this.setState({ about: !about, color: about ? newColor : color });
  };

  renderDrawer = () => {
    const { about } = this.state;
    return (
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
          <Typography variant="subtitle1" gutterBottom style={{ paddingBottom: '20px' }}>
            אסור לחזור על תשובות
          </Typography>
          <Typography variant="subtitle1">
            GANGBANG PRODUCTIONS
          </Typography>
        </div>
      </Drawer>
    );
  };

  render() {
    const { inGame, question, color } = this.state;
    return (
      <div className="App" style={{ backgroundColor: color }}>
        {this.renderDrawer()}
        <header className="App-header">
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
              <Button onClick={() => this.start()} variant="contained" color="primary" size="large">
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
