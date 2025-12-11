import connexion from "../config/bdd.js";

const getKpi = async (from, to) => {
  const [reservationsRows] = await connexion.query(
    `
      SELECT COUNT(*) AS count
      FROM reservations
      WHERE statusReservation = 'validée'
      AND dateReservation BETWEEN ? AND ?;
    `,
    [from, to]
  );
  const reservationsCount = reservationsRows[0].count;

  const [paymentsRows] = await connexion.query(
    `
      SELECT SUM(amount) AS total
      FROM payments
      WHERE paymentStatus = 'réussi'
      AND datePayment BETWEEN ? AND ?;
    `,
    [from, to]
  );
  const monthlyRevenue = paymentsRows[0].total || 0;

  const averageBasket =
    reservationsCount > 0 ? monthlyRevenue / reservationsCount : 0;

  const [accommodationsRows] = await connexion.query(
    `
      SELECT COUNT(*) AS total
      FROM accommodations;
    `
  );
  const accommodationsCount = accommodationsRows[0].total || 1;
  const occupancyRate = reservationsCount / accommodationsCount;

  return {
    reservationsCount,
    monthlyRevenue,
    averageBasket,
    occupancyRate,
  };
};

export default {
  getKpi,
};
