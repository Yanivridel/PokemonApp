import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonsSlice.js';
import userReducer from './slices/userSlice.js'

const store = configureStore({
    reducer: {
        pokemonsData: pokemonReducer,
        userLogged: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
    }),
});

export default store;