import connexion from "../config/bdd.js";

const fetchAllAccommodations = async () => {
    const sql = `SELECT idAccommodation, typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation
    FROM accommodations;`;
    const [result] = await connexion.query(sql);
    return result;
}

const fetchAccommodationById = async (id) => {
    const sql = `SELECT idAccommodation, typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation
    FROM accommodations
    WHERE idAccommodation = ?;`;
    const [result] = await connexion.query(sql, [id]);
    return result[0];
}

const fetchCreateAccommodation = async (typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation) => {
    const sql = `INSERT INTO accommodations 
    (typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation)
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [result] = await connexion.query(sql, [typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation])
    return result;
}

const fetchUpdateAccommodation = async (idAccommodation, typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation) => {
    const sql = `UPDATE accommodations
    SET typeAccommodation = ?, descriptionAccommodation = ?, abilityAccommodation = ?, surfaceAccommodation = ?, equipementAccommodation = ?, availableAccommodation = ?, basePriceAccommodation = ?
    WHERE idAccommodation = ?`
    const [result] = await connexion.query(sql, [typeAccommodation, descriptionAccommodation, abilityAccommodation, surfaceAccommodation, equipementAccommodation, availableAccommodation, basePriceAccommodation, idAccommodation])
    return result;
}

const fetchDeleteAccommodation = async (id) => {
    const sql = "DELETE FROM accommodations WHERE idAccommodation = ?"
    const [result] = await connexion.query(sql, [id]);
    return result;
}

export default {
    fetchAllAccommodations,
    fetchAccommodationById,
    fetchCreateAccommodation,
    fetchUpdateAccommodation,
    fetchDeleteAccommodation
}