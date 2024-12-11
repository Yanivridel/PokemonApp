import { createSlice } from "@reduxjs/toolkit"; 
import { removeCookie } from "../../services/cookies";

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
            removeCookie("token");
        },
        addPokemon: (state, action) => {
            const { pokemonName } = action.payload;
            if (!state.favPokemons.includes(pokemonName)) {
                state.favPokemons.push(pokemonName);
            }
        },
        deletePokemon: (state, action) => {
            const { pokemonName } = action.payload;
            state.favPokemons = state.favPokemons.filter(
                (poke) => poke.toLowerCase() !== pokemonName.toLowerCase()
            );
        },
    }
})

export const { setUser, unsetUser, addPokemon, deletePokemon } = userSlice.actions;

export default userSlice.reducer;