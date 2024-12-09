import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    useEffect(() =>{
        navigate("/404");
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
            flexDirection: 'column',
        }}
        >
        <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', color: '#ff1744' }}>
            404
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3, color: '#666' }}>
            Oops! The page you're looking for cannot be found.
        </Typography>
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGoHome}
            sx={{ padding: '10px 20px' }}
        >
            Go to Home
        </Button>
        </Box>
    );
};

export default Error404;
