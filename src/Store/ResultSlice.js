import { createSlice } from "@reduxjs/toolkit";

const initState = { result: 0 }

const resultSlice = createSlice({
    name: 'results',
    initialState: initState,
    reducers: {
        increase: (state, action) => {
            state.result += action.payload
        },
    }
})

export default resultSlice.reducer

export const { increase } = resultSlice.actions
