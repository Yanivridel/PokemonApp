import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme({
  palette: {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
