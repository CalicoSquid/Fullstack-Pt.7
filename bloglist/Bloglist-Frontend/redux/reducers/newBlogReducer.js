import { createSlice } from "@reduxjs/toolkit";

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
export default newBlogSlice.reducer;
