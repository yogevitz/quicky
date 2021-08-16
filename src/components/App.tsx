import React from 'react';
import logo from '../assets/logo.png';
import QUESTIONS from '../assets/questions.json';
import { getRandomNum } from '../utils';
import { COLORS, GITHUB_LINK, MAIL_TO, NUM_OF_QUESTIONS } from '../constants';
import { Drawer, Button, Typography, IconButton, Grid } from '@material-ui/core';
import { GitHub, MailOutline, InfoOutlined } from '@material-ui/icons';
import './App.css';

class App extends React.Component {
  state = {
    inGame: false,
    questions: [...QUESTIONS],
    question: null,
    isAbout: false,
    color: COLORS[0],
  };

  onStart = () => {
    this.setState({ inGame: true });
    this.onNext();
  };

  onNext = () => {
    const { questions } = this.state;
    let num = getRandomNum(questions.length);
    const question: string = questions[num];
    questions.splice(num, 1);
    this.setState({ questions, question });
  };

  onFail = () => {
    const { questions } = this.state
    alert(`GAME OVER\nAnswered ${NUM_OF_QUESTIONS - questions.length} questions!`);
    this.setState({ inGame: false, questions: [...QUESTIONS] });
  };

  onAbout = () => {
    const { isAbout, color } = this.state;
    let num, newColor;
    if (isAbout) {
      num = getRandomNum(COLORS.length);
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

  renderMainMenu = () => (
    <Button onClick={this.onStart} variant="contained" color="primary" size="large">
      Start
    </Button>
  );

  renderGame = () => {
    const { questions, question } = this.state;
    return (
      <>
        <Typography variant="subtitle1">
          <b>{NUM_OF_QUESTIONS - questions.length}</b>
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
      </>
    );
  };

  renderFooter = () => (
    <p>
      <IconButton onClick={this.onAbout} style={{ color: 'white' }}>
        <InfoOutlined />
      </IconButton>
    </p>
  );

  render() {
    const { inGame, color } = this.state;
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
            {inGame
              ? this.renderGame()
              : this.renderMainMenu()}
            {this.renderFooter()}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
