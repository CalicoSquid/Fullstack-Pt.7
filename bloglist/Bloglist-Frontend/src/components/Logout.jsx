import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducers/authReducer";
import Button from "./Button";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(false, navigate));
  };


  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#fd1d1d",
  };

  return (
    <div className="logout flex">
      <NavLink
        to="/blogs"
        style={({ isActive }) => (isActive ? activeLinkStyle : null)}
      >
        <p>Blogs</p>
      </NavLink>
      <NavLink
        to="/users"
        style={({ isActive }) => (isActive ? activeLinkStyle : null)}
      >
        <p>Users</p>
      </NavLink>
      <p>{user?.name}</p>
      <Button
        name="logout-button"
        label="Logout"
        onClick={handleLogout}
        type="button"
      />
    </div>
  );
}
