import noticesModel from "../models/noticesModel.js";

const createNotice = async (req, res) => {
    try {
        const { userId, note, comment } = req.body;
        // Vérifications
        if (!userId || !note) {
            return res.status(400).json({message: "L'ID utilisateur et la note sont requis"});
        }
        // Vérifie que la note est entre 0 et 5
        if (note < 0 || note > 5) {
            return res.status(400).json({message: "La note doit être comprise entre 0 et 5"});
        }
        const noticeId = await noticesModel.createNotice(userId, note, comment);
        res.status(201).json({
            message: "Avis ajouté avec succès !",
            id: noticeId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de l'ajout de l'avis"});
    }
};

const getAllNotices = async (req, res) => {
    try {
        const notices = await noticesModel.getAllNotices();
        res.status(200).json({message: "Avis récupérés avec succès !", notices});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la récupération de l'avis"})
    }
};

const getNoticeById = async (req, res) => {
    try {
        const { idNotice } = req.params;
        const notice = await noticesModel.getNoticeById(idNotice);
        if (!notice) {
            return res.status(404).json({message: "Avis non trouvé"});
        }
        res.status(200).json({message: "Avis récupéré avec succès !", notice});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la récupération de l'avis"})

    }
};

const updateNotice = async (req, res) => {
    try {
        const { idNotice } = req.params;
        const { note, comment } = req.body;
        const notice = await noticesModel.updateNotice(idNotice, note, comment);
        if (!notice) {
            return res.status(404).json({message: "Avis non trouvé"});
        }
        res.status(200).json({message: "Avis mis à jour avec succès !", notice});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la mise à jour de l'avis"})
    }
};

const deleteNotice = async (req, res) => {
    try {
        const { idNotice } = req.params;
        const notice = await noticesModel.deleteNotice(idNotice);
        if (!notice) {
            return res.status(404).json({message: "Avis non trouvé"});
        }
        res.status(200).json({message: "Avis supprimé avec succès !", notice});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur lors de la suppression de l'avis"})
    }
};

export default {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
}