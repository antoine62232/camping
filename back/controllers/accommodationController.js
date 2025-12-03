import accommodationModel from "../models/accommodationModel.js";

const getAllAccommodations = async (req, res) => {
    try {
        const allAccommodations = await accommodationModel.fetchAllAccommodations();
        res.status(200).json(allAccommodations)
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la récupération des hébergements" });
    }
}

const getAccommodationById = async (req, res) => {
    try {
        const id = req.params.id;
        const accommodationById = await accommodationModel.fetchAccommodationById(id);
        if (accommodationById) {
            res.status(200).json(accommodationById);
        } else {
            res.status(404).json({ message: "hébergement non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la récupération de l'hébergement" });
    }
}

const createAccommodation = async (req, res) => {
    try {
        const { typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation } = req.body

        if (!typeAccommodation || !descriptionAccommodation || !abilityAccommodation || !surfaceAccommodation || !equipementAccommodation || !availableAccommodation || !basePriceAccommodation) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }
        const addAccommodation = await accommodationModel.fetchCreateAccommodation(typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation)
        res.status(201).json(addAccommodation);
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la création des hébergements" });
    }
}

const updateAccommodation = async (req, res) => {
    try {
        const id = req.params.id;
        const { typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation } = req.body

        if (!typeAccommodation || !descriptionAccommodation || !abilityAccommodation || !surfaceAccommodation || !equipementAccommodation || !availableAccommodation || !basePriceAccommodation) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }
        const updateAccommodation = await accommodationModel.fetchUpdateAccommodation(id, typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation)
        if (updateAccommodation === 0) {
            res.status(404).json({ message: "hébergement modifié" });
        } else {
            res.status(200).json(updateAccommodation);
        }
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la modification des hébergements" });
    }
}

const deleteAccommodation = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAccommodation = await accommodationModel.fetchDeleteAccommodation(id);

        if (deleteAccommodation === 0) {
            res.status(404).json({ message: "hébergement non trouvé" });
        } else {
            res.status(200).json({ message: "hébergement supprimé" });
        }
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la suppression des hébergements" });
    }
}

export default {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation
}