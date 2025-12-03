import connexion from "../config/bdd.js";

// Inscription client
const createUser = async (userData) => {
    const {lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser} = userData;
    const insertUser = `
        INSERT INTO users (lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await connexion.query(insertUser, [lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser]);

    return result.insertId;
}

// Récupérer tous le clients
const getAllUsers = async () => {
    const [rows] = await connexion.query("SELECT idUser, lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, phoneNumberUser FROM users");
    return rows;
}

// Récupérer un client par son email
const getUserByEmail = async (email) => {
    const query = "SELECT idUser, lastNameUser, firstNameUser, emailUser, passwordUser FROM users WHERE emailUser = ?";
    const [rows] = await connexion.query(query, [email]);
    return rows[0];
}

// Modification des infos du client
const updateUser = async (IdUser, userData) => {
    const { 
        lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser 
    } = userData;

    const query = `
        UPDATE users
        SET lastNameUser = ?, firstNameUser = ?, dateOfBirth = ?, streetNumberUser = ?, streetNameUser = ?, postalCodeUser = ?, cityUser = ?, adressComplementUser = ?, emailUser = ?, passwordUser = ?, phoneNumberUser = ?
        WHERE idUser = ?
    `;
    const [result] = await connexion.query(query, [lastNameUser, firstNameUser, dateOfBirth, streetNumberUser || null, streetNameUser || null, postalCodeUser || null, cityUser || null, adressComplementUser || null, emailUser, passwordUser, phoneNumberUser, IdUser]);

    return result.affectedRows;
}

// Suupression d'un client par son ID
const deleteUser = async (IdUser) => {
    const query = "DELETE FROM users WHERE idUser = ?;";
    const [result] = await connexion.query(query, [IdUser]);
    return result.affectedRows;
}






export default {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser
};

