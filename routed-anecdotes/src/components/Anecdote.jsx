import React from 'react'
import {Link } from "react-router-dom";

export default function Anecdote({anecdote}) {
    return (
        <div className="anecdote">
            <Link to={`/`}>← Back</Link>
          <h2>{anecdote.content}</h2>
          <p>Has {anecdote.votes} votes</p>
        </div>
      );
}
