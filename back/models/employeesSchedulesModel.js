import connexion from "../config/bdd.js";

const createEmployeeSchedule = async (scheduleDate, startTime, endTime, hoursWorked, status, employeeId) => {
    const scheduleStatus = status || 'scheduled';
    const sql = `
        INSERT INTO employeeSchedules (scheduleDate, startTime, endTime, hoursWorked, status, employeeId, createdAt) 
        VALUES (?, ?, ?, ?, ?, ?, NOW());
    `;
    const [result] = await connexion.query(sql, [scheduleDate, startTime, endTime, hoursWorked, scheduleStatus, employeeId]);
    return result.insertId;
};

const getAllEmployeesSchedules = async () => {
    const sql = `
        SELECT 
            employeeSchedules.idSchedule,
            employeeSchedules.scheduleDate,
            employeeSchedules.startTime,
            employeeSchedules.endTime,
            employeeSchedules.hoursWorked,
            employeeSchedules.status,
            employees.lastName, 
            employees.firstName
        FROM employeeSchedules
        INNER JOIN employees ON employeeSchedules.employeeId = employees.idEmployee
        ORDER BY employeeSchedules.scheduleDate DESC;
    `;
    const [rows] = await connexion.query(sql);
    return rows;
};

const getEmployeeScheduleById = async (idSchedule) => {
    const sql = `
        SELECT 
            employeeSchedules.idSchedule,
            employeeSchedules.scheduleDate,
            employeeSchedules.startTime,
            employeeSchedules.endTime,
            employeeSchedules.hoursWorked,
            employeeSchedules.status,
            employees.lastName, 
            employees.firstName
        FROM employeeSchedules
        INNER JOIN employees ON employeeSchedules.employeeId = employees.idEmployee
        WHERE employeeSchedules.idSchedule = ?;
    `;
    const [rows] = await connexion.query(sql, [idSchedule]);
    return rows[0];
};

const updateEmployeeSchedule = async (idSchedule, scheduleDate, startTime, endTime, hoursWorked, status, employeeId) => {
    const sql = `
        UPDATE employeeSchedules SET scheduleDate = ?, startTime = ?, endTime = ?, hoursWorked = ?, status = ?, employeeId = ? WHERE idSchedule = ?;
    `;
    const [result] = await connexion.query(sql, [scheduleDate, startTime, endTime, hoursWorked, status, employeeId, idSchedule]);
    return result;
};

const deleteEmployeeSchedule = async (idSchedule) => {
    const sql = `
        DELETE FROM employeeSchedules WHERE idSchedule = ?;
    `;
    const [result] = await connexion.query(sql, [idSchedule]);
    return result;
};

export default {
    createEmployeeSchedule,
    getAllEmployeesSchedules,
    getEmployeeScheduleById,
    updateEmployeeSchedule,
    deleteEmployeeSchedule
}