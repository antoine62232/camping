import usersModels from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
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
        const userId = await usersModels.createUser(userData);
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

export default {
    createUser
}