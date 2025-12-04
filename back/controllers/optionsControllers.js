import optionsModel from "../models/optionsModel.js";

const createOption = async (req, res) => {
    try {
        const { nameOption, descriptionOption, unitPrice, durationType, quantityOption} = req.body;
        if (!nameOption || !descriptionOption || !unitPrice || !durationType || !quantityOption) {
            return res.status(400).json({message: "Tous les champs sont obligatoires"});
        }
        const optionId = await optionsModel.createOption(nameOption, descriptionOption, unitPrice, durationType, quantityOption);
        res.status(201).json({message: "Option ajoutée avec succès !", id: optionId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de l'ajout de l'option"});
    }
}

const getAllOptions = async (req, res) => {
    try {
        const options = await optionsModel.getAllOptions();
        res.status(200).json({message: "Options récupérées avec succès !", options});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la récupération des options"});
    }
}

const getOptionById = async (req, res) => {
    try {
        const option = await optionsModel.getOptionById(req.params.id);
        res.status(200).json({message: "Option récupérée avec succès !", option});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la récupération de l'option"});
    }
}

const updateOption = async (req, res) => {
    try {
        const { nameOption, descriptionOption, unitPrice, durationType, quantityOption} = req.body;
        if (!nameOption || !descriptionOption || !unitPrice || !durationType || !quantityOption) {
            return res.status(400).json({message: "Tous les champs sont obligatoires"});
        }
        const optionId = await optionsModel.updateOption(req.params.id, nameOption, descriptionOption, unitPrice, durationType, quantityOption);
        res.status(200).json({message: "Option mise à jour avec succès !", id: optionId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la mise à jour de l'option"});
    }
}

const deleteOption = async (req, res) => {
    try {
        const optionId = await optionsModel.deleteOption(req.params.id);
        res.status(200).json({message: "Option supprimée avec succès !", id: optionId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la suppression de l'option"});
    }
}

export default {
    createOption,
    getAllOptions,
    getOptionById,
    updateOption,
    deleteOption
}