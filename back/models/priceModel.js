import connexion from '../config/bdd.js'

const fetchAllPrices = async () => {
    const sql = `SELECT startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren
FROM prices;`;
    const [result] = await connexion.query(sql);
    return result;
}

const fetchPriceById = async (id) => {
    const sql = `SELECT idPrice, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren
    FROM prices
    WHERE idPrice = ?;`;
    const [result] = await connexion.query(sql, [id]);
    return result[0];
}

const fetchCreatePrices = async (accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren) => {
    const sql = `INSERT INTO prices (accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren)
    VALUES (?, ?, ?, ?, ?, ?);`;
    const [result] = await connexion.query(sql, [accommodationId, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult || null, priceAdditionalChildren || null]);
    return result;
}

const fetchUpdatePrices = async (idPrice, startDateSaison, endDateSaison, priceNight, priceAdditionalAdult, priceAdditionalChildren) => {
    const sql = `UPDATE prices
    SET startDateSaison = ?, endDateSaison = ?, priceNight = ?, priceAdditionalAdult = ?, priceAdditionalChildren = ?
    WHERE idPrice = ?`
    const [result] = await connexion.query(sql, [startDateSaison, endDateSaison, priceNight, priceAdditionalAdult || null, priceAdditionalChildren || null, idPrice]);
    return result;
}

const fetchDeletePrice = async (id) => {
    const sql = 'DELETE FROM prices WHERE idPrice = ?'
    const [result] = await connexion.query(sql, [id])
}

const fetchPriceAccommodation = async () => {
    const sql = `SELECT p.startDateSaison, p.endDateSaison, p.priceNight, p.priceAdditionalAdult, p.priceAdditionalChildren,
    a.typeAccommodation, a.descriptionAccommodation, a.abilityAccommodation, a.surfaceAccommodation, a.equipementAccommodation, a.availableAccommodation, a.basePriceAccommodation
    FROM prices e
    INNER JOIN accommodations a ON a.idAccommodation = p.accommodationId`
}

export default {
    fetchAllPrices,
    fetchPriceById,
    fetchCreatePrices,
    fetchUpdatePrices,
    fetchDeletePrice,
    fetchPriceAccommodation
}