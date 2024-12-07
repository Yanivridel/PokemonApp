import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const Signup = () => {
    const handleSignup = (event) => {
        event.preventDefault();
        // Add signup logic here
        console.log("Signup submitted");
    };

    return (
        <Box
        component="form"
        onSubmit={handleSignup}
        sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 5,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3,
        }}
        >
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
            Sign Up
        </Typography>
        <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            required
        />
        <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
        />
        <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
        />
        <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
        >
            Sign Up
        </Button>
        </Box>
    );
};

export default Signup;
