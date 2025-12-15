import { useEffect, useState, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getAllReservations,
  cancelAndRefundReservation,
} from "../services/reservationsService";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

function GestionReservations() {
  const [reservations, setReservations] = useState([]);
  const { employee } = useEmployeeAuth();
  const roleId = employee?.roleId;

  // 1. Fonction qui charge les réservations
  const reloadReservations = async () => {
    try {
      const { data } = await getAllReservations();
      const rows = data.reservations || data;

      const rowsWithId = rows.map((res) => ({
        ...res,
        id: res.idReservation,
      }));

      console.log("ROWS RESERVATIONS ===>", rowsWithId);
      setReservations(rowsWithId);
    } catch (error) {
      console.error("Erreur reservations:", error);
    }
  };

  useEffect(() => {
    reloadReservations();
  }, []);

  const handleCancelRefund = async (idReservation) => {
    const ok = window.confirm(
      "Annuler et rembourser cette réservation ? Cette action est définitive."
    );
    if (!ok) return;

    try {
      await cancelAndRefundReservation(idReservation);
      await reloadReservations();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'annulation / remboursement.");
    }
  };
  const columns = useMemo(
    () => [
      { field: "idReservation", headerName: "ID", width: 80 },
      { field: "arrivalDateReservation", headerName: "Arrivée", width: 140 },
      { field: "departureDateReservation", headerName: "Départ", width: 140 },
      { field: "statusReservation", headerName: "Statut", width: 130 },
      { field: "priceTotal", headerName: "Total (€)", width: 110 },
      { field: "userEmail", headerName: "Client", width: 220 },
      {
        field: "actions",
        headerName: "Actions",
        width: 190,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const row = params.row;
          const disabled =
            row.statusReservation === "cancelled" ||
            !(roleId === 1 || roleId === 2);

          return (
            <Button
              variant="outlined"
              color="error"
              size="small"
              disabled={disabled}
              onClick={() => handleCancelRefund(row.idReservation)}
            >
              Annuler / Rembourser
            </Button>
          );
        },
      },
    ],
    [roleId]
  );

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid rows={reservations} columns={columns} />
    </Box>
  );
}

export default GestionReservations;
