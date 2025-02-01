import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountPwdState {
  accountPwd: string;
}

const initialState: AccountPwdState = {
  accountPwd: "",
};

export const accountPwdSlice = createSlice({
  name: "accountPwd",
  initialState,
  reducers: {
    setAccountPwd: (state, action: PayloadAction<string>) => {
      state.accountPwd = action.payload;
    },
    resetAccountPwd: (state) => {
      state.accountPwd = "";
    },
  },
});

export const { setAccountPwd, resetAccountPwd } = accountPwdSlice.actions;
