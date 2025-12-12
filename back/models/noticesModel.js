import connexion from "../config/bdd.js";

// Création d'un avis
const createNotice = async (userId, note, comment) => {
    const sql = `
        INSERT INTO notices (userId, note, comment) VALUES (?, ?, ?);
    `;
    const [result] = await connexion.query(sql, [userId, note, comment]);
    return result.insertId;
}

const getAllNotices = async () => {
    const sql = `
        SELECT notices.idNotice, notices.userId, notices.note, notices.comment, notices.dateNotice, users.firstNameUser, users.lastNameUser FROM notices
        INNER JOIN users on notices.userId = users.idUser
        ORDER BY notices.dateNotice DESC;  
    `;

    const [rows] = await connexion.query(sql);
    return rows;
};

const getNoticeById = async (idNotice) => {
    const sql = `
        SELECT notices.idNotice, notices.userId, notices.note, notices.comment, notices.dateNotice, users.firstNameUser, users.lastNameUser FROM notices
        INNER JOIN users on notices.userId = users.idUser
        WHERE notices.idNotice = ?;
    `;

    const [rows] = await connexion.query(sql, [idNotice]);
    return rows[0];
};

const updateNotice = async (idNotice, note, comment) => {
    const sql = `
        UPDATE notices SET note = ?, comment = ? WHERE idNotice = ?;
    `;
    const [result] = await connexion.query(sql, [note, comment, idNotice]);
    return result;
};

const deleteNotice = async (idNotice) => {
    const sql = `
        DELETE FROM notices WHERE idNotice = ?;
    `;
    const [result] = await connexion.query(sql, [idNotice]);
    return result;
};

export default {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
}