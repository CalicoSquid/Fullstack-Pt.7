import { createSlice } from "@reduxjs/toolkit";
import { initializeBlogs } from "./blogReducer";

const newBlogSlice = createSlice({
  name: "newBlog",
  initialState: {
    title: "",
    author: "",
    url: "",
  },
  reducers: {
    updateNewBlog(state, action) {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    resetNewBlog(state) {
      return {
        ...state,
        title: "",
        author: "",
        url: "",
      };
    }
  },
});

export const { updateNewBlog, resetNewBlog } = newBlogSlice.actions;

export const updateBlog = (blog) => {
  return async (dispatch ) => {
    dispatch(updateNewBlog(blog));
    dispatch(initializeBlogs());
  };
};

export default newBlogSlice.reducer;
