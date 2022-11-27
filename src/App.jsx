import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import Copyright from "./Copyright";
import PartnerSearchForm from "./PartnerSearchForm";
import { Grid ,Pagination} from "@mui/material";
import PartnerList from "./PartnerList";
import fetcher, { API_ENDPOINT } from "./constant";
export default function App() {
  const [partners,setPartners] = React.useState();
  const [partnerSearchQuery, setPartnerSearchQuery] = useState({
    experience: [1, 5]
  });
  const [page,setPage] = React.useState(1);
  const [pageLimit,setPageLimit] = React.useState(10);
  const [noOfPages,setNoOfPages] = React.useState(0);
  
  function handleChange(field) {
    return (e) => {
      setPartnerSearchQuery({ ...partnerSearchQuery, [field]: e.target.value });
    };
  }
  function handleClear({data,metadata}){
    setPartnerSearchQuery({
      experience: [1, 5],
      fullAddress:'',
      serviceName:''
    })
  }
  function handlePageChange(e,n){
    console.log('page',n);
    setPage(n);
    handleSearch()
  }
  function handleSearch() {
    let queryParms = {};
    for (const field in partnerSearchQuery) {
      if (partnerSearchQuery[field]) {
        if (field === "experience") {
          queryParms[`q[experience[min]]`] = partnerSearchQuery[field][0];
          queryParms[`q[experience[max]]`] = partnerSearchQuery[field][1];
        } else {
          queryParms[`q[${field}]`] = partnerSearchQuery[field];
        }
      }
    }
    queryParms = new URLSearchParams({...queryParms,per:pageLimit,page});
    fetcher(API_ENDPOINT + "/partners/search?" + queryParms)
      .then((res) => res.json())
      .then(({ data, metadata }) => {
        console.log("data", data);
        setPartners(data);
        console.log("metadata", metadata);
        setNoOfPages(Math.ceil(metadata[0].total/pageLimit))
      });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <PartnerSearchForm handleSearch={handleSearch} handleChange={handleChange}  handleClear={handleClear} partnerSearchQuery={partnerSearchQuery}/>
        </Grid>
        <Grid item xs={8}>
          <PartnerList partners={partners}/>
          <Container maxWidth='sm' style={{paddingTop:'20px'}}>
            <Pagination count={noOfPages} page={page} onChange={handlePageChange} />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
