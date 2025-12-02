import connexion from "../config/bdd.js";

const fetchAllEmployees = async () => {
    const sql = `SELECT 
    lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, phoneNumber, arrivalDate 
    FROM employees;`;
    const result = await connexion.query(sql);
    return result
}

const fetchEmployeesById = async (id) => {
    const sql = `SELECT 
    id, lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, phoneNumber, arrivalDate 
    FROM employees
    WHERE id = ?;`;
    const result = await connexion.query(sql, [id]);
    return result[0];
}

const fetchCreateEmployee = async (lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId) => {
    const sql = `INSERT INTO employees 
    (lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const [result] = await connexion.query(sql, [lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId]);
    return result;
}

const fetchUpdateEmployee = async (lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate) => {
    const sql = `UPDATE employees SET
    lastName = ? firstName= ? dateOfBirth = ?, streetNumber = ?, streetName = ?, postalCode = ?, city = ?, adressComplement = ?, email = ?, password = ?, phoneNumber = ?, arrivalDate = ?;`;
    const result = await connexion.query(sql, [lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate]);
    return result;
}

const fetchDeleteEmployees = async (id) => {
    const sql = "DELETE FROM employees WHERE id = ?;";
    const result = await connexion.query(sql, [id]);
    return result;
}

const fetchEmployeesRoles = async () => {
    const sql = `SELECT e.lastName, e.firstName, r.nameRole
    FROM employees e
    INNER JOIN roles r ON r.idRole = e.roleId;`;
    const result = await connexion.query(sql);
    return result;
}

export default {
    fetchAllEmployees,
    fetchEmployeesById,
    fetchCreateEmployee,
    fetchUpdateEmployee,
    fetchDeleteEmployees,
    fetchEmployeesRoles
}