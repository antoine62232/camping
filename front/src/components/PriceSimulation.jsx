import { Box, Typography, Divider, Stack } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';

function PriceSimulation({ simulation, isLoading = false }) {
  if (!simulation || isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Remplissez le formulaire à gauche pour voir une estimation.
        </Typography>
      </Box>
    );
  }

  if (simulation.message) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="error.main">
          {simulation.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Estimation
      </Typography>
      
      <Typography variant="body2" gutterBottom>
        {simulation.nights} nuit(s)
      </Typography>

      <Stack spacing={1} sx={{ mb: 3 }}>
        {simulation.breakdown.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">{item.label}</Typography>
            <Typography variant="body1">
              <EuroIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {item.amount.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">Total</Typography>
        <Typography variant="h1" color="primary.main">
          <EuroIcon fontSize="large" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          {simulation.total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

export default PriceSimulation;