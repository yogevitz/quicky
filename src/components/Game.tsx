import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { getRandomNum } from '../utils';

export const Game = ({ questions }: { questions: string[] }) => {
  const [inGame, setInGame] = useState(false);
  const [question, setQuestion] = useState(questions[0]);
  const [answered, setAnswered] = useState(-1);

  const onStart = () => {
    onNext();
    setInGame(true);
  };

  const onNext = () => {
    setAnswered(answered + 1);
    let i = getRandomNum(questions.length);
    const nextQuestion = questions[i];
    questions.splice(i, 1);
    setQuestion(nextQuestion);
  };

  const onFail = () => {
    alert(`GAME OVER\nAnswered ${answered} questions!`);
    setInGame(false);
    setAnswered(-1);
  };

  const renderBoard = () => (
    <>
      <Typography variant="subtitle1">
        <b>{answered}</b>
      </Typography>
      <div dir="rtl" className="question">
        <p>{question}</p>
      </div>
      <div className="buttons">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Button onClick={onNext} variant="contained" color="primary" size="large">
              Next
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={onFail} variant="contained" color="secondary" size="medium">
              Fail
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );

  const renderMenu = () => (
    <Button onClick={onStart} variant="contained" color="primary" size="large">
      Start
    </Button>
  );

  return inGame ? renderBoard() : renderMenu();
};
