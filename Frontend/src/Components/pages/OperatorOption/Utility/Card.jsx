import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import Timmer from './Timmer';

const MyCard = styled(Card)`
    background: #9b9b9b;
    border-radius: 18px;
    border: 2px solid lightgray;
    color: white;
    max-width: 90%;
    width: 90%;
`;

export default function CustomCard({ title, onDone }) {
  return (
    <MyCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Timmer onDone={(time) => onDone(time, title)} />
      </CardContent>
    </MyCard>
  );
}
