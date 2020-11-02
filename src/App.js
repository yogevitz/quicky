import React from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Drawer, Typography, IconButton, Grid } from '@material-ui/core';
import { GitHub, MailOutline, InfoOutlined } from '@material-ui/icons';
import QUESTIONS from './questions.json';

const KEYS = Object.keys(QUESTIONS);
const COLORS = ['#34232f', '#3E65F0', '#A00336', '#4F7026', '#73513C'];

class App extends React.Component {
  state = {
    inGame: false,
    about: false,
    color: COLORS[0],
    count: -1,
  };

  asked = [];

  start = () => {
    this.setState({ inGame: true });
    this.next();
  };

  getRandomKey = () => Math.floor(Math.random() * KEYS.length);

  next = () => {
    const { count } = this.state;
    let rndKeyIndex = this.getRandomKey();
    while (this.asked.includes(rndKeyIndex)) {
      rndKeyIndex = this.getRandomKey();
    }
    this.asked.push(rndKeyIndex);
    const question = QUESTIONS[rndKeyIndex];
    this.setState({ question, count: count + 1 });
  };

  fail = () => {
    const { count } = this.state;
    alert(`Wak Wak Wak\nAnswered ${count} questions!`);
    this.setState({ inGame: false, count: -1 });
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

  openMail = () => window.open('mailto:yogevshlomovitz@gmail.com?subject=Quicky');

  renderDrawer = () => {
    const { about } = this.state;
    return (
      <Drawer anchor="bottom" open={about} onClose={this.toggleAbout}>
        <div dir="rtl" className="about">
          <div className="instructions">
            <Typography variant="subtitle1">
              <b>הוראות</b>
            </Typography>
            <Typography variant="subtitle1">
              בכל סיבוב, חבר אחד שואל שאלות ברצף וחבר אחר עונה. העונה צריך לענות את הדבר הראשון שקופץ לו לראש - תוך 2 שניות, בלי להתמהמה, בלי לחזור על תשובות ובלי להשתמש במילים מהשאלה.
            </Typography>
            <Typography variant="subtitle1">
              העונה נפסל? מחליפים תפקידים!
            </Typography>
          </div>
          <Typography variant="subtitle1">
            <IconButton onClick={this.openMail} style={{ color: 'white' }}>
              <MailOutline />
            </IconButton>
            <a href={'https://github.com/yogevitz/quicky'}>
              <IconButton style={{ color: 'white' }}>
                <GitHub />
              </IconButton>
            </a>
          </Typography>
        </div>
      </Drawer>
    );
  };

  render() {
    const { inGame, question, color, count } = this.state;
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
                <Typography variant="subtitle1">
                  <b>{count}</b>
                </Typography>
                <div dir="rtl" className="question">
                  <p>{question}</p>
                </div>
                <div className="buttons">
                  <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs={12}>
                      <Button onClick={this.next} variant="contained" color="primary" size="large">
                        Next
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={this.fail} variant="contained" color="secondary" size="medium">
                        Fail
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </React.Fragment>
            ) : (
              <Button onClick={this.start} variant="contained" color="primary" size="large">
                Start
              </Button>
            )}
            <p>
              <IconButton onClick={this.toggleAbout} style={{ color: 'white' }}>
                <InfoOutlined />
              </IconButton>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
