import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getAllEmployeeSchedules,
  createEmployeeSchedule,
  updateEmployeeSchedule,
  deleteEmployeeSchedule,
} from "../services/employeeSchedulesService";

const columns = [
  { field: "lastName", headerName: "Nom", flex: 1 },
  { field: "firstName", headerName: "Prénom", flex: 1 },
  { field: "scheduleDate", headerName: "Date", flex: 1 },
  { field: "startTime", headerName: "Début", flex: 1 },
  { field: "endTime", headerName: "Fin", flex: 1 },
  { field: "hoursWorked", headerName: "Heures", flex: 1 },
  { field: "status", headerName: "Statut", flex: 1 },
];

function PlanningRH() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    scheduleDate: "",
    startTime: "",
    endTime: "",
    hoursWorked: "",
    status: "",
  });

  const loadSchedules = async () => {
    try {
      const { data } = await getAllEmployeeSchedules();
      const rows = data.employeesSchedules || [];
      const rowsWithId = rows.map((res) => ({
        ...res,
        id: res.idSchedule,
      }));
      setEmployees(rowsWithId);
    } catch (error) {
      console.error("Erreur planning RH:", error);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleOpenCreate = () => {
    setEditingRow(null);
    setForm({
      lastName: "",
      firstName: "",
      scheduleDate: "",
      startTime: "",
      endTime: "",
      hoursWorked: "",
      status: "",
    });
    setOpen(true);
  };

  const handleOpenEdit = (row) => {
    setEditingRow(row);
    setForm({
      lastName: row.lastName || "",
      firstName: row.firstName || "",
      scheduleDate: row.scheduleDate || "",
      startTime: row.startTime || "",
      endTime: row.endTime || "",
      hoursWorked: row.hoursWorked || "",
      status: row.status || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      if (editingRow) {
        await updateEmployeeSchedule(editingRow.id, form);
      } else {
        await createEmployeeSchedule(form);
      }
      setOpen(false);
      await loadSchedules();
    } catch (error) {
      console.error("Erreur enregistrement planning RH:", error);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (row) => {
    const ok = window.confirm("Supprimer ce planning ?");
    if (!ok) return;
    try {
      await deleteEmployeeSchedule(row.id);
      await loadSchedules();
    } catch (error) {
      console.error("Erreur suppression planning RH:", error);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Planning RH des employés</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          Ajouter un planning
        </Button>
      </Box>

      <DataGrid
        rows={employees}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenEdit(params.row)}
                >
                  Éditer
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => handleDelete(params.row)}
                >
                  Supprimer
                </Button>
              </Box>
            ),
          },
        ]}
        autoHeight
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingRow ? "Modifier un planning" : "Ajouter un planning"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="Nom"
            fullWidth
            sx={{ mb: 2 }}
            value={form.lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            label="Prénom"
            fullWidth
            sx={{ mb: 2 }}
            value={form.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={form.scheduleDate}
            onChange={handleChange("scheduleDate")}
          />
          <TextField
            label="Heure de début"
            type="time"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={form.startTime}
            onChange={handleChange("startTime")}
          />
          <TextField
            label="Heure de fin"
            type="time"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            value={form.endTime}
            onChange={handleChange("endTime")}
          />
          <TextField
            label="Heures travaillées"
            fullWidth
            sx={{ mb: 2 }}
            value={form.hoursWorked}
            onChange={handleChange("hoursWorked")}
          />
          <TextField
            label="Statut"
            fullWidth
            sx={{ mb: 2 }}
            value={form.status}
            onChange={handleChange("status")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PlanningRH;
