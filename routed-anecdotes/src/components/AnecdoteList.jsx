import { Link } from "react-router-dom";
import Notification from "./Notification";

export default function AnecdoteList({ anecdotes, message, deleteAnecdote }) {
  return (
    <div className="anecdote-list">
      <Notification message={message} />
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link
            key={anecdote.id}
            to={`anecdotes/${anecdote.id}`}
            className="anecdote-item"
          >
            <li>
              {anecdote.content}
              <button
                className="delete-btn"
                onClick={() => deleteAnecdote(anecdote.id)}
              >
                ✖
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
