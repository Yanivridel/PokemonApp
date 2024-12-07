import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonsSlice.js';

const store = configureStore({
    reducer: {
        pokemonsData: pokemonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
    }),
});

export default store;