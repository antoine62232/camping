import connexion from "../config/bdd.js";

const addReservationOption = async (reservationId, optionId, quantity, pricePaid) => {
    const sql = `
        INSERT INTO reservationsOptions (reservationId, optionId, quantity, pricePaid)
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connexion.query(sql, [reservationId, optionId, quantity, pricePaid]);
    return result;
};

const getOptionsByReservation = async (reservationId) => {
    const sql = `
        SELECT ro.reservationId, ro.optionId, ro.quantity, ro.pricePaid,
               o.nameOption, o.descriptionOption, o.unitPrice, o.durationType
        FROM reservationsOptions ro
        INNER JOIN options o ON o.idOption = ro.optionId
        WHERE ro.reservationId = ?;
    `;
    const [rows] = await connexion.query(sql, [reservationId]);
    return rows;
};

const updateReservationOption = async (reservationId, optionId, quantity, pricePaid) => {
    const sql = `
        UPDATE reservationsOptions
        SET quantity = ?, pricePaid = ?
        WHERE reservationId = ? AND optionId = ?;
    `;
    const [result] = await connexion.query(sql, [quantity, pricePaid, reservationId, optionId]);
    return result.affectedRows;
};

const deleteReservationOption = async (reservationId, optionId) => {
    const sql = `
        DELETE FROM reservationsOptions
        WHERE reservationId = ? AND optionId = ?;
    `;
    const [result] = await connexion.query(sql, [reservationId, optionId]);
    return result.affectedRows;
};

export default {
    addReservationOption,
    getOptionsByReservation,
    updateReservationOption,
    deleteReservationOption
};