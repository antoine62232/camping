import connexion from "../config/bdd.js";

<<<<<<< HEAD
const createReservation = async (arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId) => {
    const insertReservation = `
        INSERT INTO reservations (dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId)
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal, statusReservation, userId]);
=======
const createReservation = async (arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal) => {
    const insertReservation = `
        INSERT INTO reservations (dateReservation, arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal) 
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertReservation, [arrivalDateReservation, departureDateReservation, numberAdult, numberChildren, priceHtReservation, tvaReservation, priceTotal]);
>>>>>>> baa04f5f1329b8af029ca593e1c9ea1ba0af01d9
    return result.insertId;
}

export default {
    createReservation
}