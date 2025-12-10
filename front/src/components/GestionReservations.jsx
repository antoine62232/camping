import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllReservations } from "../services/reservationsService";

const columns = [
  { field: "idReservation", headerName: "ID", width: 80 },
  { field: "arrivalDateReservation", headerName: "Arrivée", width: 140 },
  { field: "departureDateReservation", headerName: "Départ", width: 140 },
  { field: "statusReservation", headerName: "Statut", width: 130 },
  { field: "priceTotal", headerName: "Total (€)", width: 110 },
  { field: "userEmail", headerName: "Client", width: 220 },
];

function GestionReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getAllReservations();
      const rowsWithId = data.map((res, index) => ({
        ...res,
        id: index + 1,
      }));
      setReservations(rowsWithId);
    };

    fetchReservations();
  }, []);

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid rows={reservations} columns={columns} />
    </Box>
  );
}

export default GestionReservations;
