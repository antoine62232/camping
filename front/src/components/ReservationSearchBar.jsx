import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonIcon from "@mui/icons-material/Person";
import PeopleSelector from "./PeopleSelector";

function ReservationSearchBar({
  accommodations = [],
  defaultAccommodationId,
  onSearch,
}) {
  const [accommodationId, setAccommodationId] = useState(
    defaultAccommodationId || ""
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    onSearch?.({
      accommodationId: accommodationId || undefined,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      adults,
      children,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "section.main",
        p: 2,
        borderRadius: 1,
      }}
    >
      {/* Hébergements */}
      <FormControl fullWidth size="small">
        <InputLabel id="accommodation-label">Hébergements</InputLabel>
        <Select
          labelId="accommodation-label"
          id="accommodation-select"
          value={accommodationId}
          label="Hébergements"
          onChange={(e) => setAccommodationId(e.target.value)}
          sx={{ backgroundColor: "background.default", borderRadius: 1 }}
        >
          <MenuItem value="">Tous les hébergements</MenuItem>
          {accommodations.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Arrivée */}
      <DatePicker
        label="Arrivée"
        value={startDate}
        onChange={setStartDate}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            sx: { backgroundColor: "background.default", borderRadius: 1 },
          },
        }}
      />

      <DatePicker
        label="Départ"
        value={endDate}
        onChange={setEndDate}
        minDate={startDate}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            sx: { backgroundColor: "background.default", borderRadius: 1 },
          },
        }}
      />

      {/* Personnes */}
      <PeopleSelector
        adults={adults}
        children={children}
        setAdults={setAdults}
        setChildren={setChildren}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ width: 440, height: 1, borderRadius: 1 }}
      >
        Réserver
      </Button>
    </Box>
  );
}

export default ReservationSearchBar;
