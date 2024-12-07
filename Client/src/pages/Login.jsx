import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const Login = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        // Add login logic here
        console.log("Login submitted");
    };

    return (
        <Box
        component="form"
        onSubmit={handleLogin}
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
            Login
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
        <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
        >
            Login
        </Button>
        </Box>
    );
};

export default Login;
