import { useState, useEffect } from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";

import anecdoteService from "./services/anecdoteService";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    anecdoteService.getAll().then((response) => {
      setAnecdotes(response);
    });
  }, []);

  const match = useMatch("/anecdotes/:id");
  const anecdote = anecdotes.find((a) => a.id === match?.params.id);

  const addNew = async (anecdote) => {
    const response = await anecdoteService.create(anecdote);
    setAnecdotes(anecdotes.concat(response));
    setNotification({ success: `a new anecdote ${anecdote.content} created!` });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const deleteAnecdote = async (id) => {
    const response = await anecdoteService.remove(id);
    setAnecdotes(anecdotes.filter((a) => a.id !== id));
    setNotification({ success: `anecdote ${id} deleted` });
    setTimeout(() => {
      setNotification(null);
    })
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <AnecdoteList
                anecdotes={anecdotes}
                message={notification}
                deleteAnecdote={deleteAnecdote}
              />
            }
          />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdote={anecdote} />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
