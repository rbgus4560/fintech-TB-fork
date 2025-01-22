import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "../modal/modalReducer";
import { cartSlice } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { userSlice } from "../user/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
