import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllEmployeeSchedules } from "../services/employeeSchedulesService";

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

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await getAllEmployeeSchedules();
        console.log("API schedules:", data);

        const rows = data.employeesSchedules; 

        const rowsWithId = rows.map((res) => ({
          ...res,
          id: res.idSchedule,
        }));

        setEmployees(rowsWithId);
      } catch (error) {
        console.error("Erreur planning RH:", error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Planning RH des employés
      </Typography>
      <DataGrid rows={employees} columns={columns} />
    </Box>
  );
}

export default PlanningRH;
