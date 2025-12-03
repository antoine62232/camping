import express from "express";
import employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get('/allEmployees', employeeController.getAllEmployee);
router.get('/employeesById/:id', employeeController.getEmployeeById);
router.post('/addEmployee', employeeController.createEmployee);
router.put('/updateEmployee/:id', employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);
router.post('/login', employeeController.loginEmployee);

export default router;