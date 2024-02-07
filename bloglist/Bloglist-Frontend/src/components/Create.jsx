import { CircularProgress } from "@mui/material";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { createBlogs } from "../../redux/reducers/blogReducer";
import { updateNewBlog } from "../../redux/reducers/newBlogReducer";
import { toggle } from "../../redux/reducers/toggleReducer";

export default function Create() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user );

  const newBlog = useSelector(({ newBlog }) => {
    return newBlog;
  });
  const loading = useSelector(({ tasks }) => {
    return tasks.createLoading;
  });

  const handleChangeBlog = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    dispatch(updateNewBlog({ name, value }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const blogToCreate = {
      ...newBlog,
      user,
    };
    dispatch(createBlogs(blogToCreate));
  };

  return (
    <form action="submit" className="create-form flex col">
      <div className="form-fields flex col">
        <h2>Create New Blog</h2>
        <div className="input-container">
          <label htmlFor="blog-title">
            Title:
            <input
              name="title"
              value={newBlog.title}
              type="text"
              id="blog-title"
              className="blog-title create-input input"
              placeholder="Blog title"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <label htmlFor="blog-author">
            Author:
            <input
              name="author"
              value={newBlog.author}
              type="text"
              id="blog-author"
              className="blog-title create-input input"
              placeholder="Blog Author"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <label htmlFor="blog-url">
            URL:
            <input
              name="url"
              value={newBlog.url}
              type="text"
              id="blog-url"
              className="blog-title create-input input"
              placeholder="Blog Website"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <Button
            name="close"
            label="✖"
            onClick={() => dispatch(toggle())}
            type="button"
          />
        </div>

        <Button
          name="create-button"
          label={
            !loading ? "Create" : <CircularProgress size={28} color="inherit" />
          }
          onClick={(e) => handleCreateBlog(e)}
          disabled={loading}
          type="button"
        />
      </div>
    </form>
  );
}
