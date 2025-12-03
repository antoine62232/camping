import usersModel from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const createUser = async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.emailUser || !userData.passwordUser) {
            return res.status(400).json({message: "L'email et le mot de passe sont requis !"});
        }
        // A ajouter ici (Pour vérifier que le client existe déjà) => const existingUser = await userModels.getUserByEmail(email);
        // if(existingUser){
        // resturn res.status(409).json({message: "L'eamil existe déjà"})
        //}
        const passwordHashed = await bcrypt.hash(userData.passwordUser, 10);
        userData.passwordUser = passwordHashed;
        const userId = await usersModel.createUser(userData);
        if (userId) {
                res.status(201).json({message: "Client créé avec succès", id: userId});
        }else{
            res.status(500).json({message: "Erreur lors de la création d'un client."});
        }
    } catch (error) {
        console.error(error);
        
        res.status(500).json({message: "Erreur serveur lors de la création du client"});
        
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des clients."});
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usersModel.getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        }else{
            res.status(404).json({message: "Utilisateur non trouvé"});
        }
        
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération du client"});
    }
}

const login = async (req, res) => {
    try {
        const { emailUser, passwordUser} = req.body;
        // Vérifie si le client existe via son mail
        const user = await usersModel.getUserByEmail(emailUser);

        if (!user) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"});
        }
        // Vérifie le mot de passe
        const isValid = await bcrypt.compare(passwordUser, user.passwordUser);

        if (!isValid) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"});
        }
        // Génère le token JWT
        const token = jwt.sign(
            { id: user.idUser },
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );

        // Réponse
        res.status(200).json({
            message: "Connexion réussie",
            token: token,
            user: {
                id: user.idUser,
                firstName: user.firstNameUser,
                lastName: user.lastNameUser,
                email: user.emailUser
            }
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur surveur lors de la connexion"});
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;

        if (!userData.emailUser) {
            return res.status(400).json({message: "Email ou mot de passe requis"});
        }

        const updateUser = await usersModel.updateUser(id, userData)
        if (updateUser === 0) {
            res.status(404).json({message: "Client non trouvé ou pas de modification"});
        }else{
            res.status(200).json({message: "Client mis à jour avec succès"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la mise à jour du client"});
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await usersModel.deleteUser(id);
        if (deleteUser === 0) {
            res.status(404).json({message: "Client non trouvé"});
        }else{
            res.status(200).json({message: "Client supprimé avec succès"});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur serveur lors de la suppression du client"});
    }
}



export default {
    createUser,
    getAllUsers,
    getUserByEmail,
    login,
    updateUser,
    deleteUser
}