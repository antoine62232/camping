import connexion from "../config/bdd.js";

const createReservation = async (arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal) => {
    const insertReservation = `
        INSERT INTO reservations (dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal) 
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal]);
    return result.insertId;
}

export default {
    createReservation
}