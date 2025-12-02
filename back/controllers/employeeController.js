import employeeModel from "../models/employeeModel.js";

const getAllEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.fetchAllEmployees();
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des employés" })
    }
}

const getEmployeeById = async (res, req) => {
    try {
        const id = req.params.id;
        const employee = await employeeModel.fetchEmployeesById(id);

        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employé non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'employé." });
    }
}

const createEmployee = async (req, res) => {
    try {
        const { lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId } = req.body;

        if (!lastName || !firstName || !dateOfBirth || !streetNumber || !streetName || !postalCode || !city || !email || !phoneNumber || !arrivalDate) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }
        const addEmployee = await employeeModel.fetchCreateEmployee(lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId);
        res.status(201).json(addEmployee);

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création d'un employé." });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const id = req.params;
        const { lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId } = req.body;

        if (!lastName || !firstName || !dateOfBirth || !streetNumber || !streetName || !postalCode || !city || !email || !phoneNumber || !arrivalDate) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }
        const updateEmployee = await employeeModel.updateEmployee(lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId);

        if (updateEmployee === 0) {
            res.status(404).json({ message: "Employé non trouvé" });
        } else {
            res.status(200).json({ message: "Employé mis à jour" });
        }

    } catch (error) {
        res.status(500).json({message : "Erreur lors de la mise à jour de l'employé"})
    }
}

const deleteEmployee = async (req, res) =>{
    try {
        const id = req.params.id
        const deleteEmployee = await employeeModel.deleteEmployee(id);
        if (deleteEmployee === 0) {
            res.status(404).json({ message: "Employé non trouvé" });
        } else {
            res.status(200).json({ message: "Employé supprimé" });
        }
    } catch (error) {
        res.status(500).json({message : "Erreur lors de la suppression de l'employé"})
    }
}

export default {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}