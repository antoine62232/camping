import employeeModel from "../models/employeeModel.js";
import bcrypt from 'bcryptjs';

const getAllEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.fetchAllEmployees();
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des employés" })
    }
}

const getEmployeeById = async (req, res) => {
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

        const passwordHash = bcrypt.hashSync(password, 10);
        const addEmployee = await employeeModel.fetchCreateEmployee(lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, passwordHash, phoneNumber, arrivalDate, roleId);
        res.status(201).json({
        message: "Employé créé avec succès !",
        id: addEmployee.insertId
});

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création d'un employé." });

    }
}

const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const { lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, password, phoneNumber, arrivalDate, roleId } = req.body;

        if (!lastName || !firstName || !dateOfBirth || !streetNumber || !streetName || !postalCode || !city || !email || !phoneNumber || !arrivalDate) {
            res.status(400).json({ message: "Tous les champs sont obligatoires" });
            return;
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const updateEmployee = await employeeModel.fetchUpdateEmployee(id, lastName, firstName, dateOfBirth, streetNumber, streetName, postalCode, city, adressComplement, email, passwordHash, phoneNumber, arrivalDate, roleId);

        if (updateEmployee === 0) {
            res.status(404).json({ message: "Employé non trouvé" });
        } else {
            res.status(200).json({ message: "Employé mis à jour" });
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'employé" })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const deleteEmployee = await employeeModel.fetchDeleteEmployees(id);
        if (deleteEmployee === 0) {
            res.status(404).json({ message: "Employé non trouvé" });
        } else {
            res.status(200).json({ message: "Employé supprimé" });
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Erreur lors de la suppression de l'employé" })
    }
}

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "L'email et le mot de passe sont requis" });
        }

        const employee = await employeeModel.fetchEmployeeByEmail(email);
        if (!employee) {
            return res.status(401).json({ message: "email ou mot de passe incorrect" })
        }
        const passwordValid = bcrypt.compareSync(password, employee.password);
        if (passwordValid) {
            res.status(200).json({ message: "vous êtes connectés" })
        } else {
            res.status(401).json({ message: "email ou mot de passe incorrect" })
        }
    } catch (error) {
        res.status(500).json({ message: "erreur lors de la connexion de l'employé" })
        console.error(error);

    }
}

export default {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee
}