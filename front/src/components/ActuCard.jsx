import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

export default function ActuCard({ title, text, image, date }) {
  return (
    <Card sx={{ display: 'flex', borderRadius: '16px', width: '482px', height: '150px', mb: 0, border: '1px solid #D3D3D3', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)' }}>
      {/* Image à gauche */}
      <CardMedia
        component="img"
        sx={{ width: 150, height: '100%', objectFit: 'cover' }}
        image={image}
        alt={title}
      />
      
      {/* Contenu à droite */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', py: 1 }}>
          <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          {date && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              {date}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3
          }}>
            {text}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}