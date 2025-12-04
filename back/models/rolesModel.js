import connexion from "../config/bdd.js";

const createRole = async (nameRole, descriptionRole) => {
    const sql = `
        INSERT INTO roles (nameRole, descriptionRole)
        VALUES (?, ?);
    `;
    const [result] = await connexion.query(sql, [nameRole, descriptionRole]);
    return result.insertId;
};

const getAllRoles = async () => {
    const sql = `
        SELECT idRole, nameRole, descriptionRole FROM roles;
    `;
    const [rows] = await connexion.query(sql);
    return rows;
};

const getRoleById = async (idRole) => {
    const sql = `
        SELECT idRole, nameRole, descriptionRole FROM roles WHERE idRole = ?;
    `;
    const [rows] = await connexion.query(sql, [idRole]);
    return rows[0];
};

const updateRole = async (idRole, nameRole, descriptionRole) => {
    const sql = `
        UPDATE roles 
        SET nameRole = ?, descriptionRole = ? 
        WHERE idRole = ?;
    `;
    const [result] = await connexion.query(sql, [nameRole, descriptionRole, idRole]);
    return result.affectedRows;
};

const deleteRole = async (idRole) => {
    const sql = `
        DELETE FROM roles WHERE idRole = ?;
    `;
    const [result] = await connexion.query(sql, [idRole]);
    return result.affectedRows;
};

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
