import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  username: string;
  password: string;
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return {
        name: "",
        email: "",
        username: "",
        password: "",
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
    };
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState: UserState = loadState();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      saveState(state);
    },
  },
});

export const { signup } = userSlice.actions;
// export default userSlice.reducer;
