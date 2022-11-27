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

const PartnerSearchForm = ({partnerSearchQuery,handleChange,handleClear,handleSearch}) => {
  
  const [services, setServices] = useState([]);
  function getServices() {
    fetcher(API_ENDPOINT + "/services")
      .then((res) => res.json())
      .then(services=>setServices(services));
  }
  useEffect(() => {
    getServices();
  }, []);
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
          <InputLabel id="demo-simple-select-standard-label">
            Service
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={partnerSearchQuery["serviceName"]}
            onChange={handleChange("serviceName")}
            label="Service"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {services.map((service) => (
              <MenuItem value={service.name}>{service.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Location</InputLabel>
          <Input
            id="component-simple"
            value={partnerSearchQuery["fullAddress"]}
            onChange={handleChange("fullAddress")}
            placeholder="Eg. Pune"
          />
        </FormControl>
        <FormControl variant="standard">
          {/* <Box style={{ paddingTop: "20px" }}>
            <Input
              id="component-simple"
              value={partnerSearchQuery["experience[min]"]}
              onChange={handleChange("experience[min]")}
              type="number"
              size="small"
              placeholder="Min"
            />
            <Input
              id="component-simple"
              value={partnerSearchQuery["experience[max]"]}
              onChange={handleChange("experience[max]")}
              type="number"
              size="small"
              placeholder="Max"
            />
          </Box> */}
          <InputLabel htmlFor="component-simple">Experience</InputLabel>
          <Stack spacing={2} alignItems="center" style={{ marginTop: "80px" }}>
            <Slider
              getAriaLabel={() => "Experience"}
              value={partnerSearchQuery["experience"]}
              onChange={handleChange("experience")}
              valueLabelDisplay="on"
              disableSwap
              max={30}
              getAriaValueText={(v) => v}
            />
          </Stack>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item sm={5}>
            <Button variant="contained" onClick={handleSearch}>
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
