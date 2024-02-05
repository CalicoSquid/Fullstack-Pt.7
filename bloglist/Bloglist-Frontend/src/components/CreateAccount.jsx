import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { CircularProgress } from "@mui/material";
import {
  createNewUser,
  setName,
  setPassword,
  setUsername,
} from "../../redux/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading);

  const navigate = useNavigate();

  return (
    <div className="home-text create-account">
      <h2>Create new account</h2>
      <form action="submit" className="login-form flex" id="create-form">
        <div className="login-fields flex col">
          <input
            type="text"
            id="name"
            className="login-input input"
            placeholder="Name"
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
          <input
            type="text"
            id="username"
            className="login-input input"
            placeholder="Username"
            onChange={(e) => dispatch(setName(e.target.value))}
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
          label={!loading ? "Create Account" : <CircularProgress />}
          onClick={() => dispatch(createNewUser(navigate))}
          type="button"
        />
      </form>
      <Link to="/">Already have an account?</Link>
    </div>
  );
}
