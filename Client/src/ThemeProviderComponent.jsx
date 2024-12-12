import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

const lightTheme = createTheme({
    palette: {
    mode: 'light',
    primary: {
        main: '#69203a',
    },
    secondary: {
        main: '#d18b26',
    },
    custom: {
        softPurple: '#8c4351',
    },
    background: {
        default: '#f5f5f5',
        paper: '#ffffff',
    },
    text: {
        primary: '#000000',
        secondary: '#555555',
    },
    },
    components: {
    MuiAppBar: {
        styleOverrides: {
        root: {
            backgroundColor: '#69203a',
        },
        },
    },
    MuiPaper: {
        styleOverrides: {
        root: {
            backgroundColor: '#ffffff',
        },
        },
    },
    MuiChip: {
        styleOverrides: {
        root: {
            backgroundColor: '#d18b26',
            color: '#ffffff',
        },
        },
    },
    MuiListItemButton: {
        styleOverrides: {
        root: {
            "&:hover": {
            backgroundColor: "#8c4351", // Apply custom soft purple on hover
            color: "#ffffff", // White text on hover
            },
            "&.Mui-selected": {
            backgroundColor: "#8c4351", // Apply soft purple when selected
            color: "#ffffff", // White text when selected
            },
            "&.Mui-selected:hover": {
            backgroundColor: "#69203a", // Darker primary color on hover when selected
            color: "#ffffff", // Maintain white text on hover
            },
        },
        },
    },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a54d61',
        },
        secondary: {
            main: '#f5b041',
        },
        custom: {
            softPurple: '#b37485',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c7c7c7',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
            root: {
                backgroundColor: '#2a7f76',
            },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: '#2a7f76',
                    color: '#ffffff',
                    '&:hover': {
                    // backgroundColor: '#248c80',
                    },
                },
                outlinedPrimary: {
                    borderColor: "#2a7f76",
                    color: '#ffffff',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
            root: {
                backgroundColor: '#1e1e1e',
            },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                backgroundColor: '#121212',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
            thumb: {
                color: '#2a7f76',
            },
            track: {
                color: '#2a7f76',
            },
            rail: {
                color: '#2a7f76',
            },
            },
        },
        MuiTextField: {
            styleOverrides: {
            root: {
                '& label.Mui-focused': {
                color: '#2a7f76', // Label color when focused
                },
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#2a7f76', // Default border color
                },
                '&:hover fieldset': {
                    borderColor: '#2a7f76', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#2a7f76', // Border color when focused
                },
                },
            },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    '& .MuiPaginationItem-root': {
                    color: '#2a7f76', // Color of pagination items
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: '#2a7f76', // Background color when selected
                    color: '#ffffff', // Text color when selected
                    },
                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                    backgroundColor: '#248c80', // Slightly lighter color on hover
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'hsl(207, 26%, 17%)',
                    color: '#ffffff',
                    borderRight: '1px solid #2a7f76',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
            root: {
                "&:hover": {
                backgroundColor: "#2a7f76", // Teal background color on hover
                color: "#ffffff", // White text color on hover
                },
                "&.Mui-selected": {
                backgroundColor: "#2a7f76", // Teal background when selected
                color: "#ffffff", // White text color when selected
                },
                "&.Mui-selected:hover": {
                backgroundColor: "#248c80", // Darker teal on hover when selected
                color: "#ffffff", // White text on hover when selected
                },
            },
            },
        },
        MuiListItemText: {
            styleOverrides: {
            primary: {
                color: '#ffffff',
            },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
            root: {
                color: '#2a7f76',
            },
            circle: {
                strokeLinecap: 'round',
            },
            },
        },
        MuiSelect: {
            styleOverrides: {
            root: {
                backgroundColor: "#1e1e1e", // Dark background for select field
                color: "#ffffff", // White text color
                borderRadius: "4px",
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2a7f76", // Teal border color
                },
                "&:hover": {
                backgroundColor: "#248c80", // Darker teal on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2a7f76", // Teal border when focused
                },
            },
            icon: {
                color: "#2a7f76", // Teal icon color
            },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
            root: {
                "& .MuiInputBase-root": {
                backgroundColor: "#1e1e1e", // Dark background for input field
                color: "#ffffff", // White text color
                },
                "& .MuiAutocomplete-endAdornment": {
                color: "#2a7f76", // Teal adornment icon color
                },
            },
            popper: {
                backgroundColor: "#1e1e1e", // Dark background for dropdown
            },
            option: {
                "&:hover": {
                backgroundColor: "#2a7f76", // Teal background on hover
                color: "#ffffff", // White text color on hover
                },
                "&.Mui-selected": {
                backgroundColor: "#2a7f76", // Teal background when selected
                color: "#ffffff", // White text when selected
                },
                "&.Mui-selected:hover": {
                backgroundColor: "#248c80", // Darker teal on hover when selected
                color: "#ffffff", // White text when selected
                },
            },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
            root: {
                color: "#ffffff", // Checkbox color in default state (unchecked) - white
                '&.Mui-checked': {
                color: "#2a7f76", // Checkbox color when checked - teal
                },
                '&.Mui-disabled': {
                color: "#616161", // Disabled color - light grey
                },
                '&:hover': {
                backgroundColor: 'rgba(42, 127, 118, 0.08)', // Hover background color with slight transparency
                },
                '&:checked:hover': {
                backgroundColor: 'rgba(42, 127, 118, 0.12)', // Hover background color when checked
                },
            },
            },
        },
    }
});

const ThemeProviderComponent = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode');
    }, [mode]);

    const toggleTheme = () => {
        localStorage.setItem("theme", mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    };

    return (
    <MuiThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    </MuiThemeProvider>
    );
};

export default ThemeProviderComponent;
