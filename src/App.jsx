import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import Copyright from "./Copyright";
import PartnerSearchForm from "./PartnerSearchForm";
import { Grid, Pagination } from "@mui/material";
import PartnerList from "./PartnerList";
import fetcher, { API_ENDPOINT } from "./constant";
export default function App() {
  const [chargingstations, setChargingStations] = React.useState();
  const [chargingStationSearchQuery, setchargingStationSearchQuery] = useState({
    experience: [1, 5],
  });
  const [page, setPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(10);
  const [noOfPages, setNoOfPages] = React.useState(0);

  function handleChange(field) {
    return (e) => {
      setchargingStationSearchQuery({
        ...chargingStationSearchQuery,
        [field]: e.target.value,
      });
    };
  }
  function handleClear() {
    setchargingStationSearchQuery({
      state: "",
      city: "",
      search: "",
    });
  }
  function handlePageChange(e, n) {
    console.log("page", n);
    setPage(n);
    handleSearch(n);
  }
  function handleSearch(currentPage) {
    // console.log("currentPage", currentPage);
    let queryParms = {};
    queryParms = new URLSearchParams({ ...chargingStationSearchQuery });
    fetcher(API_ENDPOINT + "/chargingstations/search?" + queryParms)
      .then((res) => res.json())
      .then(({ data, metadata }) => {
        console.log("data", data);
        setChargingStations(data);
        // console.log("metadata", metadata);
        // setNoOfPages(Math.ceil(metadata[0].total / pageLimit));
      });
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
      <Grid container spacing={1}>
        <Grid item sm={3}>
          <PartnerSearchForm
            handleSearch={(e) => handlePageChange(null, 1)}
            handleChange={handleChange}
            handleClear={handleClear}
            chargingStationSearchQuery={chargingStationSearchQuery}
          />
        </Grid>
        <Grid item sm={8}>
          <PartnerList chargingstations={chargingstations} />
          {/* <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handlePageChange}
            />
          </Container> */}
        </Grid>
      </Grid>
    </Box>
  );
}
