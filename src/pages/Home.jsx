import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
    return (
        <Container style={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
            Welcome to the Pokémon Viewer
        </Typography>
        <Typography>
            Explore and discover detailed information about your favorite Pokémon!
        </Typography>
        </Container>
    );
};

export default Home;
