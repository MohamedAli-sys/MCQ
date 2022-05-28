import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        login: false,
        name: null
    },
    reducers: {
        auth: (state, action) => {
            state.login = action.payload.login
            state.name = action.payload.name
        },
    },
})

export default loginSlice.reducer
export const { auth } = loginSlice.actions