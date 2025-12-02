// src/utils/validation.js
import * as Yup from "yup";

export const reservationValidationSchema = Yup.object({
  arrivalDate: Yup.string().required("Date d’arrivée requise"),
  departureDate: Yup.string().required("Date de départ requise"),
  adults: Yup.number()
    .typeError("Nombre d’adultes invalide")
    .min(1, "Au moins 1 adulte")
    .required("Nombre d’adultes requis"),
  children: Yup.number()
    .typeError("Nombre d’enfants invalide")
    .min(0, "Minimum 0")
    .required("Nombre d’enfants requis"),
  accommodationId: Yup.string().required("Choisissez un hébergement"),
});
