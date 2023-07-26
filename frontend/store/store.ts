import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import  {loadingSlice }from "./loadingSlice";
import { userSlice } from "./userSlice";

export const store = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [loadingSlice.name] : loadingSlice.reducer,
      [userSlice.name] : userSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>; // root state
export type AppDispatch = AppStore["dispatch"] // root dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);