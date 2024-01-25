import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNew({addNew}) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    navigate("/")
  };

  return (
    <div className="create-new">
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label htmlFor="content">Content</label>
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="info">Url for more info</label>
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}
