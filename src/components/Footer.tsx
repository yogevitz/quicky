import React from 'react';
import { IconButton } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

export const Footer = ({ onClick }: { onClick: VoidFunction }) => (
  <p>
    <IconButton onClick={onClick} style={{ color: 'white' }}>
      <InfoOutlined />
    </IconButton>
  </p>
);
