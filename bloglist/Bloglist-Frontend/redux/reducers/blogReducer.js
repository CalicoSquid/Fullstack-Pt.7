import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";
import { resetMessage, setError, setSuccess } from "./messageReducer";
import { setCreateLoading, setLikes } from "./tasksReducer";
import { toggle } from "./toggleReducer";
import { resetNewBlog } from "./newBlogReducer";
import { setCurrentBlog } from "./userReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    appendBlog(state, action) {
      const newBlog = action.payload;
      return state.concat(newBlog);
    },
  },
});

export const { setBlogs, updateBlog, deleteBlog, appendBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const updateBlogs = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(setLikes(blog.id, updatedBlog.data.likes));
    dispatch(updateBlog(updatedBlog.data));
    dispatch(setCurrentBlog(updatedBlog.data));
  };
};

export const createBlogs = (blog) => {
  return async (dispatch) => {
    dispatch(setCreateLoading(true));
    try {
      const newBlog = await blogService.create(blog);
      dispatch(setCreateLoading(false));
      dispatch(appendBlog(newBlog));
      dispatch(resetNewBlog());
      const newBlogList = await blogService.getAll();
      dispatch(setBlogs(newBlogList));
      dispatch(setSuccess(`${newBlog.title} was added to the database`));
      dispatch(resetMessage());
      dispatch(toggle());
    } catch (error) {
      dispatch(setCreateLoading(false));
      dispatch(setError("Error adding blog to database"));
      dispatch(resetMessage());
    }
  };
};

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
      dispatch(setSuccess("Blog was deleted from database"));
      dispatch(resetMessage());
    } catch (error) {
      dispatch(setError("Error deleting blog from database"));
      dispatch(resetMessage());
    }
  };
};

export default blogSlice.reducer;
