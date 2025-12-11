import paymentsModel from "../models/paymentsModel.js";
import { createStripePaymentIntent } from "../models/paymentsModel.js";

const createPayment = async (req, res) => {
  try {
    const {
      reservationId,
      amount,
      referenceTransaction,
      paymentStatus,
      paymentMethod,
    } = req.body;

    if (
      !reservationId ||
      !amount ||
      !referenceTransaction ||
      !paymentStatus ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    const paymentId = await paymentsModel.createPayment(
      reservationId,
      amount,
      referenceTransaction,
      paymentStatus,
      paymentMethod
    );

    res.status(201).json({
      message: "Paiement créé avec succès !",
      id: paymentId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création du paiement" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentsModel.getAllPayments();
    res
      .status(200)
      .json({ message: "Paiements récupérés avec succès !", payments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la récupération des paiements",
      });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentsModel.getPaymentById(id);

    if (!payment) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res
      .status(200)
      .json({ message: "Paiement récupéré avec succès !", payment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération du paiement" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      reservationId,
      amount,
      referenceTransaction,
      paymentStatus,
      paymentMethod,
    } = req.body;

    if (
      !reservationId ||
      !amount ||
      !referenceTransaction ||
      !paymentStatus ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    const affectedRows = await paymentsModel.updatePayment(
      id,
      reservationId,
      amount,
      referenceTransaction,
      paymentStatus,
      paymentMethod
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json({ message: "Paiement mis à jour avec succès !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du paiement" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await paymentsModel.deletePayment(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.status(200).json({ message: "Paiement supprimé avec succès !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du paiement" });
  }
};

export async function createPaymentIntentController(req, res) {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Montant invalide" });
    }

    const paymentIntent = await createStripePaymentIntent(amount);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Erreur createPaymentIntent:", err);
    return res.status(500).json({ error: "Erreur serveur Stripe" });
  }
}


export default {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
