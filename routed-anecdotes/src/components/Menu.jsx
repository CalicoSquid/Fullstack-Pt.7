import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div className="menu">
          <Link className="navlink" to="/">
            Anecdotes
          </Link>
          <Link className="navlink" to="/create">
            Create new
          </Link>
          <Link className="navlink" to="/about">
            About
          </Link>
        </div>
      );
}
