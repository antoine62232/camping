import connexion from "../config/bdd.js";
import Stripe from "stripe";

const createPayment = async (
  reservationId,
  amount,
  referenceTransaction,
  paymentStatus,
  paymentMethod
) => {
  const sql = `
        INSERT INTO payments (reservationId, amount, referenceTransaction, paymentStatus, paymentMethod)
        VALUES (?, ?, ?, ?, ?);
    `;
  const [result] = await connexion.query(sql, [
    reservationId,
    amount,
    referenceTransaction,
    paymentStatus,
    paymentMethod,
  ]);
  return result.insertId;
};

const getAllPayments = async () => {
  const sql = `
        SELECT idPayment, reservationId, datePayment, amount, referenceTransaction, paymentStatus, paymentMethod 
        FROM payments;
    `;
  const [rows] = await connexion.query(sql);
  return rows;
};

const getPaymentById = async (idPayment) => {
  const sql = `
        SELECT idPayment, reservationId, datePayment, amount, referenceTransaction,
        paymentStatus, paymentMethod
        FROM payments WHERE idPayment = ?;
    `;
  const [rows] = await connexion.query(sql, [idPayment]);
  return rows[0];
};

const updatePayment = async (
  idPayment,
  reservationId,
  amount,
  referenceTransaction,
  paymentStatus,
  paymentMethod
) => {
  const sql = `
        UPDATE payments 
        SET reservationId = ?, amount = ?, referenceTransaction = ?, paymentStatus = ?, paymentMethod = ? 
        WHERE idPayment = ?;
    `;
  const [result] = await connexion.query(sql, [
    reservationId,
    amount,
    referenceTransaction,
    paymentStatus,
    paymentMethod,
    idPayment,
  ]);
  return result.affectedRows;
};

const deletePayment = async (idPayment) => {
  const sql = `
        DELETE FROM payments WHERE idPayment = ?;
    `;
  const [result] = await connexion.query(sql, [idPayment]);
  return result.affectedRows;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripePaymentIntent(amountInCents) {
  console.log("createStripePaymentIntent amount:", amountInCents);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "eur",
    automatic_payment_methods: { enabled: true },
  });
  return paymentIntent;
}

export async function refundStripePaymentIntent(paymentIntentId) {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
  return refund;
}

export default {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
