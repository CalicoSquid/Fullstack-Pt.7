import { useSelector } from "react-redux";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector(({ auth }) => auth.user);
  return (
    <div className="nav flex">
      <div className="header-left flex">
        <Link to="/"><h1 className="header">Bloglist</h1></Link>
      </div>
      {user && <Logout />}
    </div>
  );
}
