import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/users";
import blogService from "../../services/blogs";
import { setBlogs } from "./blogReducer";

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    currentUser: null,
    currentBlog: null,
    loadingUsers: false,
    loadingCurrentUser: false,
    loadingBlogs: false,
  },
  reducers: {
    setUsers(state, action) {
      state.allUsers = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setCurrentBlog(state, action) {
      state.currentBlog = action.payload;
    },
    setLoadingUsers(state, action) {
      state.loadingUsers = action.payload;
    },
    setLoadingCurrentUser(state, action) {
      state.loadingCurrentUser = action.payload;
    },
    setLoadingBlogs(state, action) {
      state.loadingBlogs = action.payload;
    },
  },
});

export const {
  setUsers,
  setCurrentUser,
  setCurrentBlog,
  setLoadingUsers,
  setLoadingCurrentUser,
  setLoadingBlogs,
} = userSlice.actions;

export const getUserById = (id, token) => {
  return async (dispatch, getState) => {
    dispatch(setLoadingCurrentUser(true));
    try {
      const users = await userService.getAll(token);
      dispatch(setUsers(users));
      const user = users.find((user) => user.id === id);
      dispatch(setCurrentUser(user));
      dispatch(setLoadingCurrentUser(false));
    } catch (error) {
      dispatch(setLoadingCurrentUser(false));
    }
  };
};

export const getAllUsers = (token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true));
      const users = await userService.getAll(token);
      dispatch(setUsers(users));
      dispatch(setLoadingUsers(false));
    } catch (error) {
      console.log("Error", error);
      dispatch(setLoadingUsers(false));
    }
  };
};

export const getBlogById = (id) => {
  return async (dispatch, getState) => {
    dispatch(setLoadingBlogs(true));
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
      const blogArray = getState().blogs;
      const blog = blogArray.find((blog) => blog.id === id);
      if (blog) {
        dispatch(setCurrentBlog(blog));
      } else {
        dispatch(setCurrentBlog(null));
      }
      dispatch(setLoadingBlogs(false));
    } catch (error) {
      dispatch(setLoadingBlogs(false));
    }
  };
};

export default userSlice.reducer;
