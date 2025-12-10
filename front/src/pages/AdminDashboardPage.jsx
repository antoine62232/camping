import { useState } from "react";
import { Box, Container, Typography, ButtonGroup, Button } from "@mui/material";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import { useNavigate } from "react-router-dom";
import GestionReservations from "../components/GestionReservations";
import KPI from "../components/KPI";
import PlanningRH from "../components/PlanningRH";
import RapportsFinanciers from "../components/RapportsFinanciers";

function AdminDashboardPage() {
  const { employee, logout } = useEmployeeAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("kpi");
  const roleId = employee?.roleId;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">
            Tableau de bord {employee?.firstName}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Déconnexion
          </Button>
        </Box>

        <ButtonGroup
          variant="contained"
          sx={{ mb: 3, bgcolor: "section.main" }}
        >
          <Button
            onClick={() => setTab("kpi")}
            variant={tab === "kpi" ? "contained" : "outlined"}
          >
            KPI
          </Button>

          <Button
            onClick={() => setTab("reservations")}
            variant={tab === "reservations" ? "contained" : "outlined"}
          >
            Gestion des réservations
          </Button>

          {(roleId === 1 || roleId === 2) && (
            <Button
              onClick={() => setTab("stocks")}
              variant={tab === "stocks" ? "contained" : "outlined"}
            >
              Gestion des stocks
            </Button>
          )}

          {(roleId === 1 || roleId === 2) && (
            <Button
              onClick={() => setTab("finances")}
              variant={tab === "finances" ? "contained" : "outlined"}
            >
              Rapports financiers
            </Button>
          )}

          {(roleId === 1 || roleId === 3) && (
            <Button
              onClick={() => setTab("rh")}
              variant={tab === "rh" ? "contained" : "outlined"}
            >
              Planning RH
            </Button>
          )}
        </ButtonGroup>

        {tab === "kpi" && <KPI />}

        {tab === "reservations" && <GestionReservations />}

        {tab === "stocks" && (roleId === 1 || roleId === 2) && (
          <div>Gestion des stocks à implémenter.</div>
        )}

        {tab === "finances" && (roleId === 1 || roleId === 2) && (
          <RapportsFinanciers />
        )}

        {tab === "rh" && (roleId === 1 || roleId === 3) && <PlanningRH />}
      </Container>
    </Box>
  );
}

export default AdminDashboardPage;
