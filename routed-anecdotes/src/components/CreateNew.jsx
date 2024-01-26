import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

export default function CreateNew({ addNew }) {
  const navigate = useNavigate();
  const content = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    url.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: url.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div className="create-new">
      <h2>Create a new anecdote</h2>
      <form className="form">
        <div className="form-field">
          <label htmlFor="content">Content</label>
          <input {...content} />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input {...author} />
        </div>
        <div className="form-field">
          <label htmlFor="info">Url for more info</label>
          <input {...url} />
        </div>
        <div className="buttons">
          <button className="create-btn" onClick={handleSubmit}>
            Create
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
