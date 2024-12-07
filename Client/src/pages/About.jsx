import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider } from "@mui/material";

const About = () => {
    return (
        <Box sx={{ padding: 3 }}>
        {/* Page Title */}
        <Typography variant="h3" component="h1" sx={{ textAlign: "center", marginBottom: 3 }}>
            About Us
        </Typography>

        {/* Introduction Section */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Who We Are
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", marginBottom: 3 }}>
            We are a team of passionate Pokémon enthusiasts, building a platform to explore and learn about Pokémon in a fun and interactive way. Our goal is to make Pokémon knowledge easily accessible to everyone.
        </Typography>

        {/* Technology Section */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Technology Stack
        </Typography>
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="body1">
            This platform was built using:
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
            - React.js
            </Typography>
            <Typography variant="body2">
            - Material UI
            </Typography>
            <Typography variant="body2">
            - Redux Toolkit
            </Typography>
            <Typography variant="body2">
            - PokeAPI
            </Typography>
        </Paper>

        {/* Team Section */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Meet Our Team
        </Typography>
        <Grid container spacing={3}>
            {/* Team Member */}
            {[1, 2].map((id) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
                <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} src={`/team-member-${id}.jpg`} />
                <Typography variant="h6">Team Member {id}</Typography>
                <Divider sx={{ width: "100%", marginTop: 2 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 1 }}>
                    Passionate developer with a love for Pokémon.
                </Typography>
                </Paper>
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};

export default About;
