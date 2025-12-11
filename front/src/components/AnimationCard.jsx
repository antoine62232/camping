import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

// Le composant reçoit les props : title, desc, image
export default function AnimationCard({ title, desc, image }) {
  return (
    <Card sx={{ maxWidth: 379, border: '1px solid #ccc', borderRadius: '16px', boxShadow: 3, height: 401, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: 28, textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: 12, verticalAlign: 'center' }}>
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}