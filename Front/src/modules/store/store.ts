import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "../modal/modalReducer";
import { cartSlice } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { userSlice } from "../user/userSlice";
import { memoSlice } from "../transaction/memoSlice";
import { accountPwdSlice } from "../transaction/accountPwdSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    memo: memoSlice.reducer,
    accountPwd: accountPwdSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
