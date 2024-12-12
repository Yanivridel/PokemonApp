import React, { useContext, useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Avatar, Typography, Grid2, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, CircularProgress, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { stringAvatar } from "../services/avatar";
import { unsetUser } from './../store/slices/userSlice'
import { ThemeContext } from "../ThemeProviderComponent";
import { changeUsername } from "../services/api";

const UserSettings = () => {
    const [username, setUsername] = useState("");
    const [notifications, setNotifications] = useState(localStorage.getItem("notification") === "false" ? false : true || true);
    const usernameRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { mode, toggleTheme } = useContext(ThemeContext);

    const userLogged = useSelector(state => state.userLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userLogged.isLogged)
            navigate('/login');
        setUsername(userLogged.username);
    }, [userLogged.isLogged, navigate])

    const handleAvatarChange = (e) => {
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username) 
            return;

        setLoading(true);

        try {
            const response = await changeUsername(userLogged.email, username);
            alert("Username Changed Successfully");
        }
        catch (err) {
            console.log("error: " + err);
            alert("Failed changing username");
        }
        finally {
            setLoading(false);
            window.location.reload();
        }
    };

    const handleLogout = (e) => {
        dispatch(unsetUser());
        navigate('/login')
    }

    const handleChangeNotification = (e) => {
        localStorage.setItem("notification", e.target.checked);
        setNotifications(e.target.checked);
    }

    return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
            User Settings
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Avatar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar 
                alt={userLogged.username}
                {...(userLogged.isLogged ? stringAvatar(userLogged.username) : {})}
            />
            <Button variant="outlined" component="label" sx={{ alignSelf: "center", marginTop: 1 }}>
                Change Avatar
                <input type="file" hidden onChange={handleAvatarChange} />
            </Button>
            </Box>

            {/* Username */}
            <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            {!username && <Typography color="error" sx={{ fontSize: 15}}>Username cannot be blank</Typography>}

            {/* Email */}
            <TextField
            disabled 
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={userLogged.email}
            />

            <Box sx={{ display: "flex", gap: 1}}>
                <Button color="secondary" variant="outlined" sx={{ flexGrow: 1}}
                onClick={() => alert("Currently Unavailable...")}
                >
                    Change Password
                </Button>
                <Button 
                color="secondary" 
                variant="outlined" 
                sx={{ flexGrow: 1}}
                onClick={handleLogout}
                >
                    Log Out
                </Button>  
            </Box>
            {/* Theme selection */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                {/* Theme Select */}
                <Box sx={{ flex: '1 300px' }}>
                    <InputLabel id="theme-label">Theme</InputLabel>
                    <Select
                        fullWidth
                        labelId="theme-label"
                        value={mode}
                        onChange={() => toggleTheme()}
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </Box>

                {/* Notifications Checkbox */}
                <Box >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={notifications}
                                onChange={(e) => handleChangeNotification(e)}
                            />
                        }
                        label="Enable Notifications"
                    />
                </Box>
            </Box>

            {/* Submit Button */}
            <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
            >
            {loading ? <CircularProgress size={25} color="secondary" /> : "Save Changes"}
            </Button>
        </Box>
    </Box>
    );
};

export default UserSettings;
