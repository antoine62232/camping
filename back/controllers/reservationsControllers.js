import reservationsModel from "../models/reservationsModel.js";

const createReservation = async (req, res) => {
    try {
        const { arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId } = req.body;
        
        if (!userId || !accommodationId) {
            return res.status(400).json({ message: "userId et accommodationId obligatoires" });
        }
        
        const reservationId = await reservationsModel.createReservation(arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId);
        res.status(201).json({
            message: "Réservation ajoutée avec succès !",
            id: reservationId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de l'ajout de la réservation"});
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationsModel.getAllReservations();
        res.status(200).json({message: "Réservations récupérées avec succès !", reservations});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la récupération des réservations"});
    }
}

const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationsModel.getReservationById(req.params.id);
        res.status(200).json({message: "Réservation récupérée avec succès !", reservation});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la récupération de la réservation"});
    }
}

const updateReservation = async (req, res) => {
    try {
        const { arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId, couponId } = req.body;
        const reservationId = await reservationsModel.updateReservation(req.params.id, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId, couponId || null);
        res.status(201).json({
            message: "Réservation modifiée avec succès !",
            id: reservationId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la modification de la réservation"});
    }
}

const deleteReservation = async (req, res) => {
    try {
        const reservationId = await reservationsModel.deleteReservation(req.params.id);
        res.status(201).json({
            message: "Réservation supprimée avec succès !",
            id: reservationId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la suppression de la réservation"});
    }
}

export default {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
}
