import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import newBlogReducer from "./reducers/newBlogReducer";
import messageReducer from "./reducers/messageReducer";
import authReducer from "./reducers/authReducer";
import tasksReducer from "./reducers/tasksReducer";
import toggleReducer from "./reducers/toggleReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    newBlog: newBlogReducer,
    message: messageReducer,
    auth: authReducer,
    tasks: tasksReducer,
    toggle: toggleReducer,
    users: userReducer,
  },
});
