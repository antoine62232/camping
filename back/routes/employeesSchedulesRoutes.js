import express from "express";
import employeesSchedulesControllers from "../controllers/employeesSchedulesControllers.js";    

const router = express.Router();

router.post("/add", employeesSchedulesControllers.createEmployeeSchedule);
router.get("/", employeesSchedulesControllers.getAllEmployeesSchedules);
router.get("/:id", employeesSchedulesControllers.getEmployeeScheduleById);
router.put("/update/:id", employeesSchedulesControllers.updateEmployeeSchedule);
router.delete("/delete/:id", employeesSchedulesControllers.deleteEmployeeSchedule);

export default router;