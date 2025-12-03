import connexion from "../config/bdd.js";

const createReservation = async (arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId) => {
    const insertReservation = `
        INSERT INTO reservations (dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId)
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId]);
    return result.insertId;
}

const getAllReservations = async () => {
    const selectAllReservations = `SELECT dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId FROM reservations`;
    const [result] = await connexion.query(selectAllReservations);
    return result;
}

const getReservationById = async (idReservation) => {
    const selectReservationById = `SELECT dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId FROM reservations WHERE id = ?`;
    const [result] = await connexion.query(selectReservationById, [idReservation]);
    return result;
}

const updateReservation = async (idReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId) => {
    const updateReservation = `
        UPDATE reservations
        SET arrivalDateReservation = ?, departureDateReservation = ?, numberAdult = ?, numberChildren = ?, priceHtReservation = ?, tvaReservation = ?, priceTotal = ?, statusReservation = ?, userId = ?, accommodationId = ?
        WHERE id = ?;
    `;
    const [result] = await connexion.query(updateReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId, accommodationId, idReservation]);
    return result;
}

const deleteReservation = async (idReservation) => {
    const deleteReservation = `DELETE FROM reservations WHERE id = ?`;
    const [result] = await connexion.query(deleteReservation, [idReservation]);
    return result;
}

export default {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
}