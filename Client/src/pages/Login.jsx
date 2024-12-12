import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "../services/api";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error , setError ] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userLogged = useSelector(state => state.userLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(userLogged.isLogged)
            navigate('/user-settings');
    }, [userLogged.isLogged, navigate])
    
    const togglePasswordVisibility = () => setShowPassword((show) => !show);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const data = Object.fromEntries((new FormData(e.target)).entries());
    
        if (!data.email.includes("@")) {
            addError("Invalid email format");
            setLoading(false);
            return;
        }
    
        try {
            const userData = await checkLogin(data);
    
            if (!userData) {
                addError("Invalid email or password");
                setLoading(false);
                return;
            }
            
            dispatch(setUser({username: userData.user.username, email: userData.user.email, favPokemons: userData.user.favPokemons }));
    
            document.cookie = `token=${userData.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

            navigate('/user-settings');
        } catch (err) {
            console.error("Login error:", err);
            addError("An error occurred while logging in");
        } finally {
            setLoading(false);
        }
    };

    const removeError = () => setError("");
    const addError = (err) => {
        setError(err);

        emailRef.current.classList.add("shake");
        passwordRef.current.classList.add("shake");
        setTimeout(() => {
            emailRef.current.classList.remove("shake");
            passwordRef.current.classList.remove("shake");
        }, 500);
    }

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
                ref={emailRef}
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                name="email"
                autoComplete="email"
                error={Boolean(error)}
                onChange={removeError}
            />
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
                    autoComplete="password"
                    error={Boolean(error)}
                    onChange={removeError}
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
            {Boolean(error) && 
            <Typography color="error">
                {error}
            </Typography>
            }
            <Typography component="h3" mt={1}>
                Don't have An Account ? 
                <Link to={'/signup'}>
                    <Typography display={"inline-block"} color="secondary" ml={1} fontWeight={600}>Sign up</Typography>
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
                {loading ? <CircularProgress size={25} color="secondary"/> : "Login"}
            </Button>
        </Box>
    );
};

export default Login;
