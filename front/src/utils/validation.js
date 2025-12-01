import * as Yup from 'yup';

export const reservationSchema = Yup.object().shape({
  firstName: Yup.string().required('Prénom obligatoire'),
  lastName: Yup.string().required('Nom obligatoire'),
  email: Yup.string().email('Email invalide').required('Email obligatoire'),
  checkIn: Yup.date().required('Date d’arrivée obligatoire'),
  checkOut: Yup.date()
    .required('Date de départ obligatoire')
    .min(Yup.ref('checkIn'), 'La date de départ doit être après la date d’arrivée'),
  guests: Yup.number().min(1, 'Au moins 1 personne').required('Nombre de personnes obligatoire'),
});