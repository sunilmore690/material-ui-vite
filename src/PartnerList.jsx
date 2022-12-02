import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { PARSE_FILE_ENDPOINT } from "./constant";

import DirectionsIcon from "@mui/icons-material/Directions";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
function PartnerList({ chargingstations = [] }) {
  return (
    <Grid container spacing={2}>
      {chargingstations.map((chargingstation) => (
        <Grid item xs={5} key={chargingstation._id}>
          <Card>
            <CardMedia
              component="img"
              height="50"
              width="40"
              image={
                chargingstation.logoName
                  ? PARSE_FILE_ENDPOINT + chargingstation.logoName
                  : "https://dummyimage.com/300x200"
              }
              alt="Paella dish"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="paragraph">
                {chargingstation.name}
              </Typography>
              <Typography component={"div"}>
                {chargingstation.address}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                href={`https://www.google.com/maps?q=${chargingstation.location?.lattitude},${chargingstation.location?.longitude}`}
              >
                <DirectionsIcon /> Get Directions
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PartnerList;
