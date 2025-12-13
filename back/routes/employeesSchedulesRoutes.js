import express from "express";
import employeesSchedulesControllers from "../controllers/employeesSchedulesControllers.js"; 
import { authenticateEmployee, authorizeRoles } from "../middleware/auth.js";   

const router = express.Router();

router.post("/add", authenticateEmployee, authorizeRoles(1, 2), employeesSchedulesControllers.createEmployeeSchedule);
router.get("/", authenticateEmployee, authorizeRoles(1, 2), employeesSchedulesControllers.getAllEmployeesSchedules);
router.get("/:id", authenticateEmployee, authorizeRoles(1, 2), employeesSchedulesControllers.getEmployeeScheduleById);
router.put("/update/:id", authenticateEmployee, authorizeRoles(1, 2), employeesSchedulesControllers.updateEmployeeSchedule);
router.delete("/delete/:id", authenticateEmployee, authorizeRoles(1, 2), employeesSchedulesControllers.deleteEmployeeSchedule);

export default router;