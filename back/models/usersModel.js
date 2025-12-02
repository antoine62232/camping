import connexion from "../config/bdd.js";

const createUser = async (userData) => {
    const {lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser} = userData;
    const insertUser = `
        INSERT INTO users (lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    // Exécution de la requête d'insertion
    const [result] = await connexion.query(insertUser, [lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser]);

    return result.insertId;
}

export default {createUser};