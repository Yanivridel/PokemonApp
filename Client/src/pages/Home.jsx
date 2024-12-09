import React from "react";
import { Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
// Function
import { getThreeRandomNumbers } from "../services/pokemon";

const Home = () => {
    return (
        <Box sx={{ padding: 3 }}>
        {/* Welcome Section */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Welcome to the Pokémon World
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Discover and explore all your favorite Pokémon.
            </Typography>
        </Box>

        {/* Featured Pokémon */}
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
            Featured Pokémon
        </Typography>
        <Grid container spacing={3}>
            {/* Sample Pokémon Card */}
            {getThreeRandomNumbers(1,1000).map((id) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={`Pokemon ${id}`}
                    width={100}
                    height={100}
                />
                <CardContent>
                    <Typography variant="h6" component="h3">
                    Pokémon {id}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
                    <Link to={`/pokemon/${id}`} style={{ color: "white", textDecoration: "none" }}>
                        View Details
                    </Link>
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>

        {/* Navigation Buttons */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Button variant="outlined" sx={{ marginRight: 2 }}>
            <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                Learn More About Us
            </Link>
            </Button>
            <Button variant="outlined">
            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
            </Link>
            </Button>
        </Box>
        </Box>
    );
};

export default Home;

