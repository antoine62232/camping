import reservationsModel from "../models/reservationsModel.js";

const createReservation = async (req, res) => {
    try {
        const { arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId } = req.body;
        const reservationId = await reservationsModel.createReservation(arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId);
        res.status(201).json({
            message: "Réservation ajoutée avec succès !",
            id: reservationId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de l'ajout de la réservation"});
    }
};

export default {
    createReservation
}
