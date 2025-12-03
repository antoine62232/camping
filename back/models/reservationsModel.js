import connexion from "../config/bdd.js";

const createReservation = async (arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId) => {
    const insertReservation = `
        INSERT INTO reservations (dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId)
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId]);
    return result.insertId;
}

export default {
    createReservation
}