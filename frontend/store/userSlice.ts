import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface UserState {
  username : string;
  displayName : string;
  email : string;
  isPrivate : boolean;
}

// Initial state
const initialState: UserState = {
  username : "",
  displayName : "",
  email : "",
  isPrivate : false
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUser(state, action) {
      state.username = action.payload.username;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isPrivate = action.payload.isPrivate;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUserInfo = (state: AppState) => state.user;

export default userSlice.reducer;