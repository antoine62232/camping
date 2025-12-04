import rolesModel from "../models/rolesModel.js";

const createRole = async (req, res) => {
    try {
        const { nameRole, descriptionRole } = req.body;
        
        if (!nameRole || !descriptionRole) {
            return res.status(400).json({ message: "nameRole et descriptionRole sont obligatoires" });
        }

        const roleId = await rolesModel.createRole(nameRole, descriptionRole);
        
        res.status(201).json({
            message: "Rôle créé avec succès !",
            id: roleId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la création du rôle" });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesModel.getAllRoles();
        res.status(200).json({ message: "Rôles récupérés avec succès !", roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des rôles" });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await rolesModel.getRoleById(id);
        
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        
        res.status(200).json({ message: "Rôle récupéré avec succès !", role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération du rôle" });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameRole, descriptionRole } = req.body;
        
        if (!nameRole || !descriptionRole) {
            return res.status(400).json({ message: "nameRole et descriptionRole sont obligatoires" });
        }

        const affectedRows = await rolesModel.updateRole(id, nameRole, descriptionRole);
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        
        res.status(200).json({ message: "Rôle mis à jour avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour du rôle" });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await rolesModel.deleteRole(id);
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        
        res.status(200).json({ message: "Rôle supprimé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression du rôle" });
    }
};

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
