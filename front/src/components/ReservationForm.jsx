// src/components/ReservationForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import { reservationSchema } from '../utils/validation';
import { submitReservation } from '../api/mockReservations';
import { TextField, Button } from '@mui/material';

export default function ReservationForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
    },
    validationSchema: reservationSchema,
    onSubmit: (values, { resetForm }) => {
      submitReservation(values).then(res => {
        alert('Réservation confirmée !');
        resetForm();
        console.log(res.data);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Prénom"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nom"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date d’arrivée"
        type="date"
        name="checkIn"
        value={formik.values.checkIn}
        onChange={formik.handleChange}
        error={formik.touched.checkIn && Boolean(formik.errors.checkIn)}
        helperText={formik.touched.checkIn && formik.errors.checkIn}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Date de départ"
        type="date"
        name="checkOut"
        value={formik.values.checkOut}
        onChange={formik.handleChange}
        error={formik.touched.checkOut && Boolean(formik.errors.checkOut)}
        helperText={formik.touched.checkOut && formik.errors.checkOut}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Nombre de personnes"
        type="number"
        name="guests"
        value={formik.values.guests}
        onChange={formik.handleChange}
        error={formik.touched.guests && Boolean(formik.errors.guests)}
        helperText={formik.touched.guests && formik.errors.guests}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Réserver
      </Button>
    </form>
  );
}
