import reservationsModel from "../models/reservationsModel.js";
import paymentsModel from "../models/paymentsModel.js";

const createReservation = async (req, res) => {
  try {
    const {
      arrivalDateReservation,
      departureDateReservation,
      numberAdult,
      numberChildren,
      priceHtReservation,
      tvaReservation,
      priceTotal,
      statusReservation,
      userId,
      accommodationId,
    } = req.body;

    if (!userId || !accommodationId) {
      return res
        .status(400)
        .json({ message: "userId et accommodationId obligatoires" });
    }

    const reservationId = await reservationsModel.createReservation(
      arrivalDateReservation,
      departureDateReservation,
      numberAdult,
      numberChildren,
      priceHtReservation,
      tvaReservation,
      priceTotal,
      statusReservation,
      userId,
      accommodationId
    );
    res.status(201).json({
      message: "Réservation ajoutée avec succès !",
      id: reservationId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de la réservation" });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationsModel.getAllReservations();
    res
      .status(200)
      .json({ message: "Réservations récupérées avec succès !", reservations });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la récupération des réservations",
      });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationsModel.getReservationById(
      req.params.id
    );
    res
      .status(200)
      .json({ message: "Réservation récupérée avec succès !", reservation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la récupération de la réservation",
      });
  }
};

const updateReservation = async (req, res) => {
  try {
    const {
      arrivalDateReservation,
      departureDateReservation,
      numberAdult,
      numberChildren,
      priceHtReservation,
      tvaReservation,
      priceTotal,
      statusReservation,
      userId,
      accommodationId,
      couponId,
    } = req.body;
    const reservationId = await reservationsModel.updateReservation(
      req.params.id,
      arrivalDateReservation,
      departureDateReservation,
      numberAdult,
      numberChildren,
      priceHtReservation,
      tvaReservation,
      priceTotal,
      statusReservation,
      userId,
      accommodationId,
      couponId || null
    );
    res.status(201).json({
      message: "Réservation modifiée avec succès !",
      id: reservationId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la modification de la réservation",
      });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationId = await reservationsModel.deleteReservation(
      req.params.id
    );
    res.status(201).json({
      message: "Réservation supprimée avec succès !",
      id: reservationId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la suppression de la réservation",
      });
  }
};

export const cancelAndRefundReservation = async (req, res) => {
  const { idReservation } = req.params;

  try {
    // 1. Récupérer la réservation
    const reservations = await reservationsModel.getReservationById(
      idReservation
    );
    const reservation = Array.isArray(reservations)
      ? reservations[0]
      : reservations;

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    if (reservation.statusReservation === "cancelled") {
      return res.status(400).json({ message: "Réservation déjà annulée" });
    }

    // 2. Récupérer le paiement lié (si besoin)
    const allPayments = await paymentsModel.getAllPayments();
    const payment = allPayments.find(
      (p) => String(p.reservationId) === String(idReservation)
    );

    // 3. (Projet scolaire) On NE fait PAS le refund Stripe réel
    //    On simule juste le remboursement côté BDD

    // 4. Mettre à jour la réservation
    await reservationsModel.updateReservation(
      idReservation,
      reservation.arrivalDateReservation,
      reservation.departureDateReservation,
      reservation.numberAdult,
      reservation.numberChildren,
      reservation.priceHtReservation,
      reservation.tvaReservation,
      reservation.priceTotal,
      "cancelled", // nouveau statut
      reservation.userId,
      reservation.accommodationId,
      reservation.couponId || null
    );

    // 5. Mettre à jour le paiement si trouvé (optionnel)
    if (payment) {
      await paymentsModel.updatePayment(
        payment.idPayment,
        payment.reservationId,
        payment.amount,
        payment.referenceTransaction,
        "refunded",
        payment.paymentMethod
      );
    }

    return res.status(200).json({
      message: "Réservation annulée (remboursement simulé pour le projet)",
    });
  } catch (err) {
    console.error("Erreur annulation/remboursement:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'annulation/remboursement" });
  }
};

export default {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  cancelAndRefundReservation,
};
