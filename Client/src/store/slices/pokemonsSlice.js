import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
    name: 'pokemonsData',
    initialState: {
        allPokemons: [],
        loading: false,
    },
    reducers: {
        setPokemons: (state, action) => {
        state.allPokemons = action.payload;
        },
        setLoading: (state, action) => {
        state.loading = action.payload;
        },
    },
});

export const { setPokemons, setLoading } = pokemonSlice.actions;

export default pokemonSlice.reducer;