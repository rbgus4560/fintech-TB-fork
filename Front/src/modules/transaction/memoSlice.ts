import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MemoState {
  memo: string;
}

const initialState: MemoState = {
  memo: "홍길동",
};

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<string>) => {
      state.memo = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
