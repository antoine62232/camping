import connexion from "../config/bdd.js";

const createOption = async (nameOption, descriptionOption, unitPrice, durationType, quantityOption) => {
    const sql = `
    INSERT INTO options (nameOption, descriptionOption, unitPrice, durationType, quantityOption) 
    VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(sql, [nameOption, descriptionOption, unitPrice, durationType, quantityOption]);
    return result.insertId;
};

const getAllOptions = async () => {
    const sql = `
    SELECT idOption, nameOption, descriptionOption, unitPrice, durationType, quantityOption FROM options;
    `;
    const [rows] = await connexion.query(sql);
    return rows;
}

const getOptionById = async (idOption) => {
    const sql = `
    SELECT nameOption, descriptionOption, unitPrice, durationType, quantityOption FROM options WHERE idOption = ?;
    `;
    const [rows] = await connexion.query(sql, [idOption]);
    return rows[0];
}

const updateOption = async (idOption, nameOption, descriptionOption, unitPrice, durationType, quantityOption) => {
    const sql = `
    UPDATE options SET nameOption = ?, descriptionOption = ?, unitPrice = ?, durationType = ?, quantityOption = ? WHERE idOption = ?;
    `;
    const [result] = await connexion.query(sql, [nameOption, descriptionOption, unitPrice, durationType, quantityOption, idOption]);
    return result;
}

const deleteOption = async (idOption) => {
    const sql = `
    DELETE FROM options WHERE idOption = ?;
    `;
    const [result] = await connexion.query(sql, [idOption]);
    return result;
}

export default {
    createOption,
    getAllOptions,
    getOptionById,
    updateOption,
    deleteOption
}