import reservationsOptionsModel from "../models/reservationsOptionsModel.js";

const addReservationOption = async (req, res) => {
    try {
        const { reservationId, optionId, quantity, pricePaid } = req.body;

        if (!reservationId || !optionId || !quantity || !pricePaid) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const result = await reservationsOptionsModel.addReservationOption(
            reservationId, optionId, quantity, pricePaid
        );

        res.status(201).json({
            message: "Option ajoutée à la réservation avec succès !",
            inserted: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'option à la réservation" });
    }
};

const getOptionsByReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const options = await reservationsOptionsModel.getOptionsByReservation(reservationId);
        res.status(200).json({
            message: "Options de la réservation récupérées avec succès !",
            options
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des options de la réservation" });
    }
};

const updateReservationOption = async (req, res) => {
    try {
        const { reservationId, optionId, quantity, pricePaid } = req.body;

        if (!reservationId || !optionId || !quantity || !pricePaid) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const affectedRows = await reservationsOptionsModel.updateReservationOption(
            reservationId, optionId, quantity, pricePaid
        );

        if (affectedRows === 0) {
            return res.status(404).json({ message: "L'option pour cette réservation n'a pas été trouvée ou modifiée" });
        }

        res.status(200).json({ message: "Option de réservation mise à jour avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'option de la réservation" });
    }
};

const deleteReservationOption = async (req, res) => {
    try {
        const { reservationId, optionId } = req.body;

        if (!reservationId || !optionId) {
            return res.status(400).json({ message: "reservationId et optionId sont obligatoires" });
        }

        const affectedRows = await reservationsOptionsModel.deleteReservationOption(
            reservationId, optionId
        );

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Option de réservation non trouvée" });
        }

        res.status(200).json({ message: "Option de réservation supprimée avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de l'option de la réservation" });
    }
};

export default {
    addReservationOption,
    getOptionsByReservation,
    updateReservationOption,
    deleteReservationOption
};
