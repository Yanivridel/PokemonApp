import React, { useContext, useState } from "react";
import webLogo from './../assets/pokemon_logo.png'
import {AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, Button, Avatar} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
// Functions
import { stringAvatar, stringToColor } from "../services/avatar.js";
import { unsetUser } from "../store/slices/userSlice.js";
import { ThemeContext } from "../ThemeProviderComponent.jsx";

const Navbar = () => {
    const { mode, toggleTheme } = useContext(ThemeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const userLogged = useSelector(state => state.userLogged);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/pokemons?page=1&name=&type=&weight=0%2C650&height=0%2C20", label: "Pokemons" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ];
    const navUser = [
        {to: '/login', label: "Login", icon: <LoginIcon sx={{ml: 1}}/>},
        { to: '/signup', label: "Sign up", icon: <PersonAddIcon sx={{ml: 1}}/>}
    ]
    
    const toggleDrawer = (open) => setDrawerOpen(open);
    function handleListItemClick(e, index) {
        setSelectedIndex(index);
        toggleDrawer(false);
    }

    const handleLogout = (e) => {
        dispatch(unsetUser());
        navigate('/login')
        toggleDrawer(false);
    }

    return (
        <>
        <AppBar position="static">
            <Toolbar>
            {isSmallScreen ? (
                // SMALL SCREEN
                <>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                {/* Title */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: '"Parkinsans", sans-serif',
                        fontWeight: 900,
                        fontSize: 25,
                        ml: 2
                    }}
                    onClick={toggleTheme}
                    >
                    PokeZone
                </Typography>
                <Box
                    component="img"
                    src={webLogo}
                    alt="webLogo"
                    sx={{ height: 90, padding: 1}}
                />
                </>
            ) : (
                // LARGE SCREEN
                <Box sx={{ display: "flex", width: "100%", alignItems: "center"}}>
                    <Box
                    component="img"
                    src={webLogo}
                    alt="webLogo"
                    sx={{ height: 90, padding: 1}}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: '"Parkinsans", sans-serif',
                            fontWeight: 900,
                            fontSize: 25,
                            ml: 2
                        }}
                        >
                        PokeZone
                    </Typography>
                    {/* Header Navigation Links */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {navLinks.map((link) => (
                        <Button
                            key={link.to}
                            component={Link}
                            to={link.to}
                            color="inherit"
                            sx={{ textTransform: "none", textDecoration: "none", fontSize: "1.1rem",
                                "&:hover": {
                                    backgroundColor: "#8c4351",
                                    }
                            }}
                        >
                            {link.label}
                        </Button>
                        ))}
                    </Box>
                    { userLogged.isLogged ? 
                    <Link to="/user-settings">
                        <Avatar 
                        {... stringAvatar(userLogged.username)}
                        />
                    </Link>
                    :
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", ml: 4}}>
                        {navUser.map((link) =>
                        <Typography
                        key={link.to}
                        component={Link}
                        to={link.to}
                        color="inherit"
                        sx={{ fontSize: "1.1rem",
                            "&:hover": {
                                textDecoration: "underline"
                            }
                        }}
                        >
                            {link.label}
                            {link.icon}
                        </Typography>
                        )}
                    </Box>
                    }
                </Box>
            )}
            </Toolbar>
        </AppBar>

        {/* Drawer for Small Screens */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
            <IconButton
                color="inherit"
                onClick={() => toggleDrawer(false)}
                sx={{ position: "absolute", right: 0 }}
            >
                <CloseIcon sx={{fontSize: 35}}/>
            </IconButton>
            {/* Title */}
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontFamily: '"Parkinsans", sans-serif',
                    fontWeight: 900,
                    fontSize: 25,
                    color: theme.palette.secondary.main,
                    marginBlock: 1,
                    ml: 2
                }}
                onClick={toggleTheme}
                >
                PokeZone
            </Typography>
            <hr style={{ borderColor: "#69203a", width: "90%", marginInline: "auto"}}/>
            {/* Nav List */}
            <List sx={{ width: 250 }}>
            {navLinks.map((link, index) => (
                <ListItem key={link.to} disablePadding>
                <ListItemButton
                    selected={selectedIndex === index}
                    component={Link}
                    to={link.to}
                    onClick={(e) => handleListItemClick(e,index)}
                    sx={{
                        "&:hover": {
                            backgroundColor: theme.palette.custom.softPurple,
                            color: "#fff",
                        },
                        "&.Mui-selected": {
                        backgroundColor: theme.palette.custom.softPurple,
                        color: "#fff", 
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                >
                    <ListItemText primary={link.label} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            { userLogged.isLogged ? 
            <Box sx={{marginTop: "auto", display: "flex", alignItems: "center"}}>
                <Link to="/user-settings">
                    <Avatar 
                    {... stringAvatar(userLogged.username)}
                    onClick={() => toggleDrawer(false)}
                    />
                </Link>
                <Typography 
                variant="h6"
                onClick={handleLogout}
                sx={{
                    "&:hover": {
                        color: theme.palette.primary.main,
                        textDecoration: "underline",
                        cursor: "pointer", 
                        transition: "color 0.3s ease, text-decoration 0.3s ease",
                    },
                }}
                >
                    Log Out
                </Typography>
            </Box>
            :
            <List sx={{ width: 250, mt:"auto" }}>
                {navUser.map((link) => 
                <ListItem key={link.to} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={link.to}
                        onClick={(e) => handleListItemClick(e, null)}
                    >
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
            }            
        </Drawer>
        </>
    );
};

export default Navbar;
