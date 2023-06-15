import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice(
  {
    name: 'admin',
    initialState: {
      currentAdmin: null,
    },
    reducers: {
      setAdmin: (state, action) => {
        state.currentAdmin = action.payload;
      },
      adminSignOut: (state, action) => {
        state.currentAdmin = null;
      },
    }

  }
)
export const { setAdmin } = slice.actions;
export const { adminSignOut } = slice.actions;
export default slice.reducer;
