import connexion from "../config/bdd.js";

const addUser = async (lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser) => {
    // Requête SQL pour insérer un nouvel utilisateur
    const insertUser = `
        INSERT INTO users (lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    // Exécution de la requête d'insertion
    const [result] = await connexion.query(insertUser, [lastNameUser, firstNameUser, dateOfBirth, streetNumberUser, streetNameUser, postalCodeUser, cityUser, adressComplementUser, emailUser, passwordUser, phoneNumberUser]);

    return result;
}

export default addUser;