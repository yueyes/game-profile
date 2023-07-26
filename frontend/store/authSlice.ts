import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  isLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  isLoggedIn : false
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export const getIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;

export default authSlice.reducer;