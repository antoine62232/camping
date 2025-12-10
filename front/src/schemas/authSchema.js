// src/schemas/authSchema.js
import * as Yup from "yup";

export const registerSchema = Yup.object({
  lastName: Yup.string().required("Nom requis"),
  firstName: Yup.string().required("Prénom requis"),
  dateOfBirth: Yup.string().required("Date de naissance requise"),
  streetNumber: Yup.string(),
  streetName: Yup.string(),
  postalCode: Yup.string(),
  city: Yup.string(),
  adressComplement: Yup.string(),
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().min(8, "8 caractères minimum").required("Mot de passe requis"),
  phoneNumber: Yup.string().required("Téléphone requis"),
  newsletter: Yup.boolean()
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis")
});
