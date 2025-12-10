import employeeModel from "../models/employeeModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        console.error(error);
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
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const employee = await employeeModel.fetchEmployeeByEmail(email);
    if (!employee) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const passwordValid = await bcrypt.compare(password, employee.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { idEmployee: employee.idEmployee, roleId: employee.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Connexion employée réussie",
      token: token,
      employee: {
        id: employee.idEmployee,
        roleId: employee.roleId,
        email: employee.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
};


export default {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee
}