import employeesSchedulesModel from "../models/employeesSchedulesModel.js";

const createEmployeeSchedule = async (req, res) => {
    try {
        const { scheduleDate, startTime, endTime, hoursWorked,   status, employeeId } = req.body;
        const employeeScheduleId = await employeesSchedulesModel.createEmployeeSchedule(scheduleDate, startTime, endTime, hoursWorked, status, employeeId);
        res.status(201).json({ message: "Planning de l'employé créé avec succès", employeeScheduleId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création du planning de l'employé." });
    }
};

const getAllEmployeesSchedules = async (req, res) => {
    try {
        const employeesSchedules = await employeesSchedulesModel.getAllEmployeesSchedules();
        if (!employeesSchedules) {
            return res.status(404).json({ error: "Les plannings des employés n'ont pas été trouvés." });
        }
        res.status(200).json({ message: "Plannings des employés récupérés avec succès", employeesSchedules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des plannings des employés." });
    }
};

const getEmployeeScheduleById = async (req, res) => {
    try {
        const id = req.params.id
        const employeeSchedule = await employeesSchedulesModel.getEmployeeScheduleById(id);
        if (!employeeSchedule) {
            return res.status(404).json({ error: "Le planning de l'employé n'a pas été trouvé." });
        }
        res.status(200).json({ message: "Planning de l'employé récupéré avec succès", employeeSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du planning de l'employé." });
    }
};

const updateEmployeeSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const { scheduleDate, startTime, endTime, hoursWorked, status, employeeId } = req.body;
        const employeeSchedule = await employeesSchedulesModel.updateEmployeeSchedule(id, scheduleDate, startTime, endTime, hoursWorked, status, employeeId);
        if (!employeeSchedule) {
            return res.status(404).json({ error: "Le planning de l'employé n'a pas été trouvé." });
        }
        res.status(200).json({ message: "Planning de l'employé mis à jour avec succès", employeeSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du planning de l'employé." });
    }
};

const deleteEmployeeSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        const employeeSchedule = await employeesSchedulesModel.deleteEmployeeSchedule(id);
        if (!employeeSchedule) {
            return res.status(404).json({ error: "Le planning de l'employé n'a pas été trouvé." });
        }
        res.status(200).json({ message: "Planning de l'employé supprimé avec succès", employeeSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du planning de l'employé." });
    }
};

export default {
    createEmployeeSchedule,
    getAllEmployeesSchedules,
    getEmployeeScheduleById,
    updateEmployeeSchedule,
    deleteEmployeeSchedule
}