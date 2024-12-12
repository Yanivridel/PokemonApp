import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Typography, Alert, CircularProgress, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createUser } from "../services/api";

const Signup = () => {
    const [success, setSuccess] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ userEmailError , setUserEmailError ] = useState("");
    const [ passwordError , setPasswordError ] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const userLogged = useSelector(state => state.userLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if(userLogged.isLogged)
            navigate('/user-settings');
    }, [userLogged.isLogged, navigate])

    const togglePasswordVisibility = () => setShowPassword((show) => !show);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const data = Object.fromEntries((new FormData(e.target)).entries());

        if (!data.email.includes("@")) {
            addUserEmailError("Invalid email format");
            setLoading(false);
            return;
        }

        if (data.password !== data.confirmPassword) {
            addPasswordError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const userData = { email: data.email, username: data.newUsername, password: data.password };
            console.log(userData);
            await createUser(userData);

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.status === 409) {
                addUserEmailError("Email or username already taken");
                setLoading(false);
                return;
            }
            console.error("Signup error:", err);
            addPasswordError("An error occurred while signing up");
        } finally {
            setLoading(false);
            e.target.reset();
        }
    };

    const removePasswordError = () => setPasswordError("");
    const removeUserEmailError = () => setUserEmailError("");
    const addPasswordError = (err) => {
        setPasswordError(err);
        passwordRef.current.classList.add("shake");
        confirmPasswordRef.current.classList.add("shake");
        setTimeout(() => {
            passwordRef.current.classList.remove("shake");
            confirmPasswordRef.current.classList.remove("shake");
        }, 500);
    }
    const addUserEmailError = (err) => {
        setUserEmailError(err);
        usernameRef.current.classList.add("shake");
        emailRef.current.classList.add("shake");
        setTimeout(() => {
            usernameRef.current.classList.remove("shake");
            emailRef.current.classList.remove("shake");
        }, 500);
    }

    return (
        <Box
        component="form"
        onSubmit={handleSignup}
        autoComplete="off"
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
            ref={emailRef}
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            required
            name="email"
            autoComplete="username"
            error={Boolean(userEmailError)}
            onChange={removeUserEmailError}
        />
        <TextField
            ref={usernameRef}
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            required
            name="newUsername"
            autoComplete="off"
            error={Boolean(userEmailError)}
            onChange={removeUserEmailError}
        />
        {Boolean(userEmailError) && 
        <Typography color="error">
            {userEmailError}
        </Typography>
        }
        <Box position={"relative"}>
            <TextField
                ref={passwordRef}
                fullWidth
                label="Password"
                type={ showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                required
                name="password"
                autoComplete="current-password"
                error={Boolean(passwordError)}
                onChange={removePasswordError}
            />
            <IconButton
            onClick={togglePasswordVisibility}
            sx={{ 
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '55%',
                right: "-5%",
            }}>
                {showPassword ? <VisibilityOff sx={{ fontSize: 30}}/> : <Visibility sx={{ fontSize: 30}}/>}
            </IconButton>
        </Box>
        <Box position={"relative"}>
        <TextField
            ref={confirmPasswordRef}
            fullWidth
            label="Confirm Password"
            type={ showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            required
            name="confirmPassword"
            error={Boolean(passwordError)}
            onChange={removePasswordError}
        />
        <IconButton 
            onClick={togglePasswordVisibility}
            sx={{ 
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '55%',
                right: "-5%",
            }}>
                {showPassword ? <VisibilityOff sx={{ fontSize: 30}}/> : <Visibility sx={{ fontSize: 30}}/>}
            </IconButton>
        </Box>
        
        {Boolean(passwordError) && 
        <Typography color="error">
            {passwordError}
        </Typography>
        }
        {success && 
        <Alert severity="success" sx={{position: 'relative'}}>
            Sign up successfully ! redirecting <CircularProgress color="secondary" size={20} sx={{ position: 'absolute', ml: 2}} />
        </Alert>
        }
        <Typography component="h3" mt={1}>
            Already have an account ?
            <Link to={'/login'}>
                <Typography display={"inline-block"} color="secondary" ml={1} fontWeight={600}>Login</Typography>
            </Link>
        </Typography>
        <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
        >
            {loading ? <CircularProgress size={25} color="secondary"/> : "Sign up"}
        </Button>
        </Box>
    );
};

export default Signup;
