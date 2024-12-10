import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: "userLogged",
    initialState: {
        isLogged: false,
        username: "",
        email: "",
        favPokemons: []
    },
    reducers: {
        setUser: (state, action) => {
            const { username, email, favPokemons } = action.payload;
            
            if (username && email && favPokemons) {
                state.username = username;
                state.email = email;
                state.favPokemons = favPokemons;
                state.isLogged = true;
            } else {
                console.error("Invalid user data:", action.payload);
            }
        },
        unsetUser: (state, action) => {
            state.username = "";
            state.email = "";
            state.favPokemons = [];
            state.isLogged = false;
        },
        addPokemon: (state, action) => {
            if (!state.favPokemons.includes(action.payload.pokemonName))
                state.favPokemons.push(action.payload.pokemonName);
        },
        deletePokemon: (state, action) => {
            state.favPokemons = state.favPokemons.filter(poke => poke !== action.payload.pokemonName);
        },
    }
})

export const { setUser, unsetUser, addPokemon, deletePokemon } = userSlice.actions;

export default userSlice.reducer;