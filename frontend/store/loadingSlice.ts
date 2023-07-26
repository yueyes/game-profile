import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface LoadingState {
  isLoading: boolean;
}

// Initial state
const initialState: LoadingState = {
  isLoading : false
};

// Actual Slice
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // Action to set the authentication status
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.loading,
      };
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;

export const getIsLoading = (state: AppState) => state.loading.isLoading;

export default loadingSlice.reducer;