import { Link } from "react-router-dom";
import Notification from "./Notification";

export default function AnecdoteList({ anecdotes, message }) {
  return (
    <div className="anecdote-list">
      <Notification message={message} />
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link key={anecdote.id} to={`anecdotes/${anecdote.id}`}>
            <li>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
