import express from "express";
import rolesController from "../controllers/rolesController.js";

const router = express.Router();

router.post("/register", rolesController.createRole);
router.get("/", rolesController.getAllRoles);
router.get("/:id", rolesController.getRoleById);
router.put("/update/:id", rolesController.updateRole);
router.delete("/delete/:id", rolesController.deleteRole);

export default router;
