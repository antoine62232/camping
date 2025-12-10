import priceModel from "../models/priceModel.js";

const getAllPrices = async (req, res) => {
    try {
        const allPrices = await priceModel.fetchAllPrices();
        res.status(200).json(allPrices);
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la récupération des prix" });
    }
}

const getPriceById = async (req, res) => {
    try {
        const id = req.params.id;
        const priceById = await priceModel.fetchPriceById(id);

        if (priceById) {
            res.status(200).json(priceById)
        } else {
            res.status(404).json({ message: "prix non trouvé" })
        }
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la récupération du prix" });
    }
}
const createPrice = async (req, res) => {
    try {
        const { accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren } = req.body;
        if (!startDateSaison || !endDateSaison || !priceNight) {
            res.status(400).json({ message: "Les champs sont obligatoires" });
            return;
        }
        const addPrice = await priceModel.fetchCreatePrices(accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren);
        res.status(200).json(addPrice);
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la création du prix" });
    }
}

const updatePrice = async (req, res) => {
    try {
        const id = req.params.id;
        const { startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren } = req.body;
        if (!startDateSaison || !endDateSaison || !priceNight) {
            res.status(400).json({ message: "Les champs sont obligatoires" });
            return;
        }
        const updatePrice = await priceModel.fetchUpdatePrices(id, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren)
        res.status(200).json(updatePrice)
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la modification du prix" });
    }
}

const deletePrice = async (req, res) => {
    try {
        const id = req.params.id;
        const deletePrice = await priceModel.fetchDeletePrice(id)
        res.status(200).json(deletePrice)
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ message: "erreur lors de la suppression du prix" });
    }
}


export default {
    getAllPrices,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice
}