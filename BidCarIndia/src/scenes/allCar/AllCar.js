import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";
import { BASE_URL } from '../../config/Config';

const AllCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/car`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVisibilityChange = async (carId, visibility) => {
    const token = localStorage.getItem('jwtToken');
  
    try {
      const response = await axios.put(
        `${BASE_URL}/visible/admin/${visibility}/${carId}`,
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      const message = response.data;
      console.log("Update success message:", message);
  
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === carId ? { ...car, visible: visibility } : car))
      );
    } catch (error) {
      console.error("Error updating car visibility:", error);
    }
  };

  const handleAuctionEndTimeChange = (carId, newEndTime) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId ? { ...car, newAuctionEndTime: newEndTime } : car
      )
    );
  };

  const updateAuctionEndTime = async (carId, newEndTime) => {
    const token = localStorage.getItem('jwtToken');
  
    try {
      const response = await axios.put(
        `${BASE_URL}/auction/time/${carId}`,
        null,
        {
          params: { localDateTime: newEndTime },
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      const message = response.data;
      console.log("Auction End Time update success:", message);
  
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId ? { ...car, auctionEndTime: newEndTime } : car
        )
      );
    } catch (error) {
      console.error("Error updating Auction End Time:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom marginBottom={5}>
        Manage Cars
      </Typography>
      <Grid container spacing={2}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
            <StyledCard>
              <CardMediaWrapper>
                <CardMedia
                  component="img"
                  height="auto"
                  image={car.imageUrls[0]}
                  alt={car.carName}
                />
              </CardMediaWrapper>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {car.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Model: {car.modelNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fuel Type: {car.fuelType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transmission: {car.transmissionType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Auction End Time: {new Date(car.auctionEndTime).toLocaleString()}
                </Typography>
                <TextField
                  label="Update Auction End Time"
                  type="datetime-local"
                  value={car.newAuctionEndTime || new Date(car.auctionEndTime).toISOString().slice(0, 16)}
                  onChange={(e) => handleAuctionEndTimeChange(car.id, e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => updateAuctionEndTime(car.id, car.newAuctionEndTime)}
                >
                  Update Auction End Time
                </Button>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button variant="contained" size="small" color="primary">
                  View Details
                </Button>
                <FormControl variant="outlined" size="small">
                  <InputLabel>Visibility</InputLabel>
                  <Select
                    label="Visibility"
                    value={car.visible ? "visible" : "hidden"}
                    onChange={(e) => handleVisibilityChange(car.id, e.target.value === "visible")}
                  >
                    <MenuItem value="visible">
                      <Visibility /> Visible
                    </MenuItem>
                    <MenuItem value="hidden">
                      <VisibilityOff /> Not Visible
                    </MenuItem>
                  </Select>
                </FormControl>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

const CardMediaWrapper = styled(Box)({
  height: 140,
  overflow: "hidden",
});

export default AllCar;
