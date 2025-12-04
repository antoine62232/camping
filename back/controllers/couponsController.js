import couponsModel from "../models/couponsModel.js";

const createCoupon = async (req, res) => {
    try {
        const { codeCoupon, valueReduction, expiryDate } = req.body;
        if (!codeCoupon || valueReduction === undefined || !expiryDate) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        const id = await couponsModel.createCoupon(codeCoupon, valueReduction, expiryDate);
        res.status(201).json({ message: "Coupon créé avec succès !", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la création du coupon" });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await couponsModel.getAllCoupons();
        res.status(200).json({ message: "Coupons récupérés avec succès !", coupons });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des coupons" });
    }
};

const getCouponById = async (req, res) => {
    try {
        const idCoupon = req.params.id;
        const coupon = await couponsModel.getCouponById(idCoupon);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon non trouvé" });
        }
        res.status(200).json({ message: "Coupon récupéré avec succès !", coupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération du coupon" });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const idCoupon = req.params.id;
        const { codeCoupon, valueReduction, expiryDate } = req.body;
        if (!codeCoupon || valueReduction === undefined || !expiryDate) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        const affectedRows = await couponsModel.updateCoupon(idCoupon, codeCoupon, valueReduction, expiryDate);
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Coupon non trouvé ou pas modifié" });
        }
        res.status(200).json({ message: "Coupon mis à jour avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour du coupon" });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const idCoupon = req.params.id;
        const affectedRows = await couponsModel.deleteCoupon(idCoupon);
        if (affectedRows === 0) {
            return res.status(404).json({ message: "Coupon non trouvé" });
        }
        res.status(200).json({ message: "Coupon supprimé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression du coupon" });
    }
};

export default {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
};
