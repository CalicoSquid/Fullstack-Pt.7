import { CircularProgress } from "@mui/material";
import Button from "./Button";
import {
  loginUser,
  setPassword,
  setUsername,
} from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(navigate));
  };

  return (
    <form action="submit" className="login-form flex" id="login-form">
      <div className="login-fields flex col">
        <input
          type="text"
          id="username"
          className="login-input input"
          placeholder="Username"
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <input
          type="password"
          id="password"
          className="login-input input"
          placeholder="Password"
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
      </div>
      <Button
        loading={loading}
        name="login-button"
        id="login-button"
        label={!loading ? "Login" : <CircularProgress />}
        onClick={handleLogin}
        type="button"
      />
      <Link to="/createAccount">Create Account</Link>
    </form>
  );
}
