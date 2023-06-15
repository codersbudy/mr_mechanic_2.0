import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../WebApi/api";
import axios from 'axios'
export const fatchMechanicBookingHistory = createAsyncThunk("fetchBookingHistory", async (mechanicId) => {
    let response = await axios.post(api.MECHANIC_BOOKING_HISTORY, { mechanicId: "647492f6b17b8642e9326d5a" });
    if (response.data) {
        return response.data;
    }
})

const slice = createSlice({
    name: "mechanic",
    initialState: {
        currentMechanic: null,
        mechanicBookingHistory: [],
        mechanicBookingHistoryIsLoading: false,
        error: null
    },
    reducers: {
        setMechanic: (state, action) => {
            state.currentMechanic = action.payload;
        },
        mechanicSignOut: (state, action) => {
            state.currentMechanic = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fatchMechanicBookingHistory.pending, (state, action) => {
            state.mechanicBookingHistoryIsLoading = true;
        }).addCase(fatchMechanicBookingHistory.fulfilled, (state, action) => {
            state.mechanicBookingHistory = action.payload.result;
            state.mechanicBookingHistoryIsLoading = false;
        }).addCase(fatchMechanicBookingHistory.rejected, (state, action) => {
            state.error = "oops something went wrong";
            state.mechanicBookingHistoryIsLoading = true;
        })
    }
})


export const { setMechanic } = slice.actions;
export const { mechanicSignOut } = slice.actions;
export default slice.reducer;