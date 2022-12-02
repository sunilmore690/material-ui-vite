import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  Slider,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import fetcher, { API_ENDPOINT } from "./constant";

const PartnerSearchForm = ({
  chargingStationSearchQuery,
  handleChange,
  handleClear,
  handleSearch,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  function getStates() {
    fetcher(API_ENDPOINT + "/states")
      .then((res) => res.json())
      .then((states) => setStates(states));
  }
  function getCities() {
    fetcher(API_ENDPOINT + "/cities?state=" + state)
      .then((res) => res.json())
      .then((cities) => setCities(cities));
  }
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    getCities();
  }, [chargingStationSearchQuery.state]);
  return (
    <Card sx={{ minWidth: 275, margin: "10px" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "10px",
        }}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Location</InputLabel>
          <Input
            id="component-simple"
            value={chargingStationSearchQuery["search"]}
            onChange={handleChange("search")}
            placeholder="Eg. Pune"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={chargingStationSearchQuery["state"]}
            onChange={handleChange("state")}
            label="State"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {states.map((state) => (
              <MenuItem value={state.name}>{state.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={chargingStationSearchQuery["city"]}
            onChange={handleChange("city")}
            label="City"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem value={city.name}>{city.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item sm={5}>
            <Button variant="contained" onClick={() => handleSearch()}>
              Search
            </Button>
          </Grid>
          <Grid item sm={5}>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PartnerSearchForm;
