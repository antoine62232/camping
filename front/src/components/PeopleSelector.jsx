import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function PeopleSelector({ adults, children, setAdults, setChildren }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => setOpen((o) => !o);
  const handleClose = () => setOpen(false);

  const label = `${adults} adulte(s), ${children} enfant(s)`;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", width: 1300 }}>
        <TextField
          fullWidth
          size="small"
          label="Personnes"
          value={label}
          inputRef={anchorRef}
          onClick={handleToggle}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="success" />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "background.default", borderRadius: 1, cursor: "pointer" }}
        />

        {open && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              mt: 1,
              p: 2,
              zIndex: 10,
              minWidth: 260,
            }}
          >
            {/* Adultes */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
              <Box>Adultes</Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setAdults((n) => Math.max(1, n - 1))}
                >
                  -
                </Button>
                <Box sx={{ width: 24, textAlign: "center" }}>{adults}</Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setAdults((n) => n + 1)}
                >
                  +
                </Button>
              </Box>
            </Box>

            {/* Enfants */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>Enfants</Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setChildren((n) => Math.max(0, n - 1))}
                >
                  -
                </Button>
                <Box sx={{ width: 24, textAlign: "center" }}>{children}</Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setChildren((n) => n + 1)}
                >
                  +
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}

export default PeopleSelector;
