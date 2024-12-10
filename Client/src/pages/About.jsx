import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Divider } from "@mui/material";
// Images
import chatGPTImage from './../assets/image/chatGPT_img.png';
import rorschaks from './../assets/image/rorschaks.png';


const About = () => {

    const teamData = [
        { img: rorschaks, name: "Yaniv Ridel", msg: "Passionate developer with zero love for Pokémon."},
        { img: chatGPTImage, name: "Chat GPT", msg: "Passionate AI with a love for everything you want him to love."}
    ]

    return (
        <Box sx={{ padding: 3, maxWidth: 1350, marginInline: "auto" }}>
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
        <Paper sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 4, padding: 3, marginBottom: 3 }}>
            <Box minWidth={200}>
                <Typography variant="h4">Frontend:</Typography>
                <Typography variant="body1">This platform was built using:</Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>- React.js</Typography>
                <Typography variant="body2">- Material UI</Typography>
                <Typography variant="body2">- Redux Toolkit</Typography>
                <Typography variant="body2">- PokeAPI</Typography>
            </Box>
            <Box minWidth={200}>
                <Typography variant="h4">Backend:</Typography>
                <Typography variant="body1">This platform was built using:</Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>- Express</Typography>
                <Typography variant="body2">- JWT & Bcrypt</Typography>
                <Typography variant="body2">- MongoDB & Mongoose</Typography>
            </Box>
            
        </Paper>

        {/* Team Section */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Meet Our Team
        </Typography>
        <Grid container spacing={3}>
            {/* Team Members */}
            {teamData.map((member, index) => (
            <Grid item xs={12} sm={6} md={6} key={"team-"+index}>
                <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} src={member.img} />
                <Typography variant="h6">{member.name}</Typography>
                <Divider sx={{ width: "100%", marginTop: 2 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 1 }}>
                    {member.msg}
                </Typography>
                </Paper>
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};

export default About;
