import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";
import loginService from "../../services/login";
import userService from "../../services/users";
import { openLoginModal } from "./tasksReducer";
import { resetMessage, setError } from "./messageReducer";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    name: "",
    password: "",
    username: "",
    loading: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    resetUser(state, action) {
      state.user = null;
    },
    resetCredentials(state, action) {
      (state.password = ""), (state.username = "");
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setUser,
  setName,
  setPassword,
  setUsername,
  resetUser,
  resetCredentials,
  setLoading,
} = authSlice.actions;

export const loginUser = (navigate) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { username, password } = getState().auth;
      const loggedUser = await loginService.login({ name, username, password });
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      dispatch(setUser(loggedUser));
      dispatch(resetCredentials());
      dispatch(setLoading(false));
      navigate("/blogs");
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError("invalid username or password"));
      dispatch(resetMessage());
    }
  };
};

export const logoutUser = (shouldOpenModal = false, navigate) => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(resetUser());

    if (shouldOpenModal) {
      dispatch(openLoginModal());
    }

    navigate("/");
  };
};

export const createNewUser = (navigate) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { username, name, password } = getState().auth;
      await userService.createNew({ username, name, password });
      dispatch(loginUser(navigate));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("Error", error);
      dispatch(setError("invalid username or password"));
      dispatch(resetMessage());
    }
  };
};
export default authSlice.reducer;
