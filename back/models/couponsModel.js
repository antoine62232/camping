import connexion from "../config/bdd.js";

const createCoupon = async (codeCoupon, valueReduction, expiryDate) => {
    const sql = `
        INSERT INTO coupons (codeCoupon, valueReduction, expiryDate)
        VALUES (?, ?, ?);
    `;
    const [result] = await connexion.query(sql, [codeCoupon, valueReduction, expiryDate]);
    return result.insertId;
};

const getAllCoupons = async () => {
    const sql = `
        SELECT idCoupon, codeCoupon, valueReduction, expiryDate FROM coupons;
    `;
    const [rows] = await connexion.query(sql);
    return rows;
};

const getCouponById = async (idCoupon) => {
    const sql = `
        SELECT idCoupon, codeCoupon, valueReduction, expiryDate FROM coupons WHERE idCoupon = ?;
    `;
    const [rows] = await connexion.query(sql, [idCoupon]);
    return rows[0];
};

const updateCoupon = async (idCoupon, codeCoupon, valueReduction, expiryDate) => {
    const sql = `
        UPDATE coupons SET codeCoupon = ?, valueReduction = ?, expiryDate = ? WHERE idCoupon = ?;
    `;
    const [result] = await connexion.query(sql, [codeCoupon, valueReduction, expiryDate, idCoupon]);
    return result.affectedRows;
};

const deleteCoupon = async (idCoupon) => {
    const sql = `
        DELETE FROM coupons WHERE idCoupon = ?;
    `;
    const [result] = await connexion.query(sql, [idCoupon]);
    return result.affectedRows;
};

export default {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
};