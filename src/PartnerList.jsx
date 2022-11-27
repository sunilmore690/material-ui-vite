import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton
} from "@mui/material";
import { PARSE_FILE_ENDPOINT } from "./constant";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function PartnerList({ partners = [] }) {
  return (
    <Grid container spacing={2}>
      {partners.map((partner) => (
        <Grid item xs={5} key={partner._id}>
          <Card >
            <CardMedia
              component="img"
              height="50"
              width="40"
              
              image={
                partner.logoName
                  ? PARSE_FILE_ENDPOINT + partner.logoName
                  : "https://dummyimage.com/300x200"
              }
              alt="Paella dish"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="paragraph">
                {partner.name}
                {partner.verified ? (
                  <TaskAltIcon color="success"></TaskAltIcon>
                ) : null}
              </Typography>
              <Typography component={"paragraph"}>
                  ESTD {partner.estd}
              </Typography> 
              <Typography component={"div"}>
                {partner.fullAddress}
              </Typography> 
              <Typography component={"paragraph"}>
                <b style={{ fontWeight: 30 }}>About Us </b>:{" "}
                {partner.description}
              </Typography>
              <Typography component={"div"}>
                <b style={{ fontWeight: 50 }}>Services </b>:{" "}
                {partner.serviceNames}
              </Typography>
              <Typography component={"div"}>
                <b style={{ fontWeight: 50 }}>Experience </b>:{" "}
                {partner.experience} yrs
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" color="info">
                <AccountBoxIcon /> View Profile
              </IconButton>
              
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PartnerList;
