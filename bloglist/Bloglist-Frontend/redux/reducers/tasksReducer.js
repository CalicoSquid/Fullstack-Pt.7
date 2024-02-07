import { createSlice } from "@reduxjs/toolkit";
import { deleteBlogs, updateBlogs } from "./blogReducer";
import { setError } from "./messageReducer";


const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    blogModal: { isOpen: false, type: "" },
    loginModal: { isOpen: false },
    likes: {},
    createLoading: false,
    showDetails: false,
    comments: "",
  },
  reducers: {
    openModal(state, action) {
      const { blogId, modalType } = action.payload;
      state.blogModal[blogId] = { isOpen: true, type: modalType };
    },
    closeModal(state, action) {
      state.blogModal = { isOpen: false, type: "" };
      state.loginModal = { isOpen: false };
    },
    openLoginModal(state) {
      state.loginModal = { isOpen: true };
    },
    setLikes(state, action) {
      const { blogId, likes } = action.payload;
      state.likes[blogId] = likes;
    },
    setCreateLoading(state, action) {
      state.createLoading = action.payload;
    },
    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  openLoginModal,
  setLikes,
  setCreateLoading,
  setShowDetails,
  setComments,
} = taskSlice.actions;

export const voteBlogs = (blog, likes) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes,
      };
      dispatch(updateBlogs(blogToUpdate));
      dispatch(setLikes({ blogId: blog.id, likes }));
    } catch (error) {
      dispatch(setError("Error updating blog"));
    }
  };
};

export const commentBlogs = (blog, comment) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = {
        ...blog,
        comments: blog.comments.concat({ text: comment, time: new Date() }),
      };
      dispatch(updateBlogs(blogToUpdate));
      dispatch(setComments(""));
    } catch (error) {
      dispatch(setError("Error updating blog"));
    }
  };
};

export const deleteComments = (blog, id) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = {
        ...blog,
        comments: blog.comments.filter((c) => c._id !== id),
      };
      dispatch(updateBlogs(blogToUpdate));
    } catch (error) {
      dispatch(setError("Error updating blog"));
    }
  };
};

export const closeAndDelete = (blog, navigate) => {
  return async (dispatch) => {
    dispatch(closeModal());
    dispatch(deleteBlogs(blog.id));
    navigate("/blogs");
  };
};

export default taskSlice.reducer;
