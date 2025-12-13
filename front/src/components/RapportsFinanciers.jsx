import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getFinancialReport, downloadFinancialCsv } from "../services/reportsService";

const columns = [
  { field: "idPayment", headerName: "ID paiement", flex: 1 },
  { field: "datePayment", headerName: "Date", flex: 1 },
  { field: "amount", headerName: "Montant (€)", flex: 1 },
  { field: "paymentMethod", headerName: "Méthode", flex: 1 },
  { field: "paymentStatus", headerName: "Statut paiement", flex: 1 },
  { field: "idReservation", headerName: "ID réservation", flex: 1 },
  { field: "statusReservation", headerName: "Statut réservation", flex: 1 },
];

function RapportsFinanciers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");

  const loadReport = async () => {
    try {
      setLoading(true);
      const { data } = await getFinancialReport({ from, to });
      const reportRows = data.financialReport || [];
      const rowsWithId = reportRows.map((p) => ({
        ...p,
        id: p.idPayment,
      }));
      setRows(rowsWithId);
    } catch (error) {
      console.error("Erreur rapport financier:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExportFinancialCsv = async () => {
    try {
      const res = await downloadFinancialCsv({ from, to });
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "text/csv" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "rapport-financier.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'export CSV du rapport financier.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rapports financiers
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          type="date"
          label="Du"
          InputLabelProps={{ shrink: true }}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <TextField
          type="date"
          label="Au"
          InputLabelProps={{ shrink: true }}
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Button variant="contained" onClick={loadReport}>
          Rafraîchir
        </Button>
        <Button variant="outlined" onClick={handleExportFinancialCsv}>
          Exporter CSV
        </Button>
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}

export default RapportsFinanciers;
