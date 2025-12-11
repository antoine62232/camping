import connexion from "../config/bdd.js";

const getFinancialReport = async (from, to) => {
  const [rows] = await connexion.query(
    `
      SELECT 
        p.idPayment,
        p.datePayment,
        p.amount,
        p.paymentMethod,
        p.paymentStatus,
        r.idReservation,
        r.statusReservation
      FROM payments p
      INNER JOIN reservations r ON p.reservationId = r.idReservation
      WHERE p.datePayment BETWEEN ? AND ?
      ORDER BY p.datePayment DESC;
    `,
    [from, to]
  );

  return rows;
};

export default {
  getFinancialReport,
};
