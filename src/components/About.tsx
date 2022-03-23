import React from 'react';
import { Drawer, IconButton, Typography } from '@material-ui/core';
import { GitHub, MailOutline } from '@material-ui/icons';
import { GITHUB_LINK, MAIL_TO } from '../constants';

interface AboutProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const About = ({ isOpen, onClose }: AboutProps) => {
  const onClickMail = () => window.open(MAIL_TO);

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
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
          <IconButton onClick={onClickMail} style={{ color: 'white' }}>
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
