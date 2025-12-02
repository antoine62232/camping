// src/components/ReservationForm.jsx
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { reservationValidationSchema } from "../utils/validation";

const accommodationTypes = [
  { id: 1, label: "Mobil-home" },
  { id: 2, label: "Bungalow" },
  { id: 3, label: "Emplacement tente" },
];

const initialValues = {
  arrivalDate: "",
  departureDate: "",
  adults: 1,
  children: 0,
  accommodationId: "",
};

function ReservationForm({ onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reservationValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Date d’arrivée
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="arrivalDate"
                value={values.arrivalDate}
                onChange={handleChange}
                error={touched.arrivalDate && Boolean(errors.arrivalDate)}
                helperText={touched.arrivalDate && errors.arrivalDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Date de départ
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="departureDate"
                value={values.departureDate}
                onChange={handleChange}
                error={touched.departureDate && Boolean(errors.departureDate)}
                helperText={touched.departureDate && errors.departureDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Nombre d'adultes
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="adults"
                value={values.adults}
                onChange={handleChange}
                error={touched.adults && Boolean(errors.adults)}
                helperText={touched.adults && errors.adults}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Nombre d'enfants
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="children"
                value={values.children}
                onChange={handleChange}
                error={touched.children && Boolean(errors.children)}
                helperText={touched.children && errors.children}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Type d'hébergement
              </Typography>
              <TextField
                select
                fullWidth
                name="accommodationId"
                value={values.accommodationId}
                onChange={handleChange}
                error={
                  touched.accommodationId && Boolean(errors.accommodationId)
                }
                helperText={touched.accommodationId && errors.accommodationId}
              >
                {accommodationTypes.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Réserver
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ReservationForm;
