import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Avatar, Typography, Grid2, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, CircularProgress, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { stringAvatar, stringToColor } from "../services/avatar";
import { unsetUser } from './../store/slices/userSlice'
import { ThemeContext } from "../ThemeProviderComponent";

const UserSettings = () => {
    // States for form fields and avatar
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("PokemonMaster");
    const [avatar, setAvatar] = useState(null);
    const [notifications, setNotifications] = useState(true);
    const [loading, setLoading] = useState(false);
    const { mode, toggleTheme } = useContext(ThemeContext);

    const userLogged = useSelector(state => state.userLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userLogged.isLogged)
            navigate('/login');
    }, [userLogged.isLogged, navigate])

    const handleAvatarChange = (e) => {
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Simulate a request
        setTimeout(() => {
        setLoading(false);
        alert("User settings updated!");
        }, 2000);
    };

    const handleLogout = (e) => {
        dispatch(unsetUser());
        navigate('/login')
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
                // src={avatar || "https://via.placeholder.com/150"} 
                alt={username} 
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
            value={userLogged.username}
            onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email */}
            <TextField
            disabled 
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={userLogged.email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Box sx={{ display: "flex", gap: 1}}>
                <Button color="secondary" variant="outlined" sx={{ flexGrow: 1}}>
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
                                onChange={(e) => setNotifications(e.target.checked)}
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
