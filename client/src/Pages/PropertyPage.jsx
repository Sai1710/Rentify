import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [interestedUser, setInterestedUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/listings/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        setProperty(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const fetchInterestedUser = async () => {
    try {
      const response = await axios.get(`/listings/${id}/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setInterestedUser(response.data);
    } catch (error) {
      console.error("Error fetching interested user:", error);
    }
  };

  const handleInterestedClick = () => {
    fetchInterestedUser();
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (loading) {
    return (
      <Container sx={{ marginTop: "20px" }}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        </Paper>
      </Container>
    );
  }
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {property.title}
        </Typography>
        <Slider {...sliderSettings}>
          {property.images.map((image, index) => (
            <div key={index}>
              <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Property image ${index + 1}`}
                  sx={{ height: 400, objectFit: "cover" }}
                />
              </Card>
            </div>
          ))}
        </Slider>
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Rent"
                    secondary={`$${property.rent}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Location"
                    secondary={property.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Area"
                    secondary={`${property.area} sq ft`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Number of Bathrooms"
                    secondary={property.numBathrooms}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Number of Bedrooms"
                    secondary={property.numBedrooms}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Nearby Hospitals"
                    secondary={property.nearby.hospitals.join(", ")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    primary="Nearby Colleges"
                    secondary={property.nearby.colleges.join(", ")}
                  />
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                onClick={handleInterestedClick}
                sx={{ marginTop: "20px" }}
              >
                I am Interested
              </Button>
              {interestedUser && (
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "20px" }}
                >
                  Seller Details:
                </Typography>
              )}
              {interestedUser && (
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={`${interestedUser.firstname} ${interestedUser.lastname}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={interestedUser.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={interestedUser.phone}
                    />
                  </ListItem>
                </List>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PropertyPage;
