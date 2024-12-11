import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

const lightTheme = createTheme({
    palette: {
    mode: 'light',
    primary: {
        main: "#69203a",
    },
    secondary: {
        main: "#d18b26",
    },
    custom: {
        softPurple: "#8c4351",
    },
    },
});

const darkTheme = createTheme({
    palette: {
    mode: 'dark',
    primary: {
        main: "#69203a",
    },
    secondary: {
        main: "#d18b26",
    },
    custom: {
        softPurple: "#8c4351",
    },
    },
});

    const ThemeProviderComponent = ({ children }) => {
    const [mode, setMode] = useState("light");

    const toggleTheme = () => {
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
