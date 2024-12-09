import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: "userLogged",
    initialState: {
        isLogged: false,
        username: "",
        email: ""
    },
    reducers: {
        // setUser: (state, action) => {
        //     state.username = action.payload.username;
        //     state.email = action.payload.email
        //     state.isLogged = true;
        // },
        setUser: (state, action) => {
            // Ensure the username and email are present in the payload
            const { username, email } = action.payload;
            
            // Only update if username and email are available
            if (username && email) {
                state.username = username;
                state.email = email;
                state.isLogged = true;
            } else {
                console.error("Invalid user data:", action.payload);
            }
        },
        unsetUser: (state, action) => {
            state.username = "";
            state.email = "";
            state.isLogged = false;
        }
    }
})

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;