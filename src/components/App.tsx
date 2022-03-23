import React, { useState } from 'react';
import { LOGO, QUESTIONS } from '../assets';
import { getRandomNum } from '../utils';
import { COLORS } from '../constants';
import { About, Game, Footer } from '.';
import './App.css';

export const App = () => {
  const [isAbout, setIsAbout] = useState(false);
  const [color, setColor] = useState(COLORS[0]);

  const onCloseAbout = () => {
    setIsAbout(false);
    const newColor = COLORS[getRandomNum(COLORS.length)];
    setColor(newColor);
  };

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <About isOpen={isAbout} onClose={onCloseAbout} />
      <header className="App-header">
        <img
          height="197px"
          width="300px"
          src={LOGO}
          className="logo"
          alt="logo"
        />
        <div>
          <Game questions={[...QUESTIONS]} />
          <Footer onClick={() => setIsAbout(true)} />
        </div>
      </header>
    </div>
  );
}
