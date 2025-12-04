import express from "express";
import employeeController from "../controllers/employeeController.js";
import { authenticateEmployee, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get('/allEmployees', employeeController.getAllEmployee);
router.get('/employeesById/:id', authenticateEmployee, employeeController.getEmployeeById);
router.post('/addEmployee', authenticateEmployee, authorizeRoles(1, 2), employeeController.createEmployee);
router.put('/updateEmployee/:id', authenticateEmployee, authorizeRoles(1, 9), employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', authenticateEmployee, authorizeRoles(1), employeeController.deleteEmployee);
router.post('/login', employeeController.loginEmployee);

export default router;