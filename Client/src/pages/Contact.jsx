import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";

const Contact = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const theme = useTheme();

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const subject = encodeURIComponent("New Message From Contact Form");
        const body = encodeURIComponent(message);
        const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}%0A%0AFrom: ${encodeURIComponent(email)}`;

        window.location.href = mailtoLink;

        // Clear the form
        setMessage("");
        setEmail("");
    };

    return (
        <Box
            sx={{
                padding: 3,
                maxWidth: 1350,
                marginInline: "auto",
                color: theme.palette.text.primary,
            }}
        >
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
                                label="Your Email"
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Your Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={message}
                                onChange={handleMessageChange}
                                required
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
