// src/index.js
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import ThemeProviderComponent from './ThemeProviderComponent';

const Main = () => {
  return (
    <Provider store={store}>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </Provider>
  );
};

// Create the root element and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
