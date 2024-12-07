import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const Contact = () => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Message Sent!");
    };

    return (
        <Box sx={{ padding: 3 }}>
        {/* Page Title */}
        <Typography variant="h3" component="h1" sx={{ textAlign: "center", marginBottom: 3 }}>
            Contact Us
        </Typography>

        {/* Contact Form */}
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
            We'd love to hear from you!
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" sx={{ width: "100%" }}>
                    Send Message
                </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
        </Box>
    );
};

export default Contact;
