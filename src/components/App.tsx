import React from 'react';
import logo from '../assets/logo.png';
import questions from '../assets/questions.json';
import { COLORS, GITHUB_LINK, MAIL_TO } from '../constants';
import { Drawer, Button, Typography, IconButton, Grid } from '@material-ui/core';
import { GitHub, MailOutline, InfoOutlined } from '@material-ui/icons';
import './App.css';

class App extends React.Component {
  state = {
    inGame: false,
    question: null,
    isAbout: false,
    color: COLORS[0],
    count: -1,
  };

  asked: number[] = [];

  onStart = () => {
    this.setState({ inGame: true });
    this.onNext();
  };

  onNext = () => {
    const { count } = this.state;
    let num = this._getRandomNum(questions.length);
    while (this.asked.includes(num)) {
      num = this._getRandomNum(questions.length);
    }
    this.asked.push(num);
    const question: string = questions[num];
    this.setState({ question, count: count + 1 });
  };

  onFail = () => {
    const { count } = this.state;
    alert(`GAME OVER\nAnswered ${count} questions!`);
    this.setState({ inGame: false, count: -1 });
  };

  onAbout = () => {
    const { isAbout, color } = this.state;
    let num, newColor;
    if (isAbout) {
      num = this._getRandomNum(COLORS.length);
      newColor = COLORS[num];
    }
    this.setState({ isAbout: !isAbout, color: newColor || color });
  };

  onMail = () => window.open(MAIL_TO);

  renderAbout = () => {
    const { isAbout } = this.state;
    return (
      <Drawer anchor="bottom" open={isAbout} onClose={this.onAbout}>
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
            <IconButton onClick={this.onMail} style={{ color: 'white' }}>
              <MailOutline />
            </IconButton>
            <a href={GITHUB_LINK}>
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
        {this.renderAbout()}
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
                      <Button onClick={this.onNext} variant="contained" color="primary" size="large">
                        Next
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={this.onFail} variant="contained" color="secondary" size="medium">
                        Fail
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </React.Fragment>
            ) : (
              <Button onClick={this.onStart} variant="contained" color="primary" size="large">
                Start
              </Button>
            )}
            <p>
              <IconButton onClick={this.onAbout} style={{ color: 'white' }}>
                <InfoOutlined />
              </IconButton>
            </p>
          </div>
        </header>
      </div>
    );
  }

  _getRandomNum = (max: number) => Math.floor(Math.random() * max);
}

export default App;
