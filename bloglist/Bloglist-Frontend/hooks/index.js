import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../redux/reducers/authReducer";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let logoutTimer;

    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const decodedToken = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logoutUser(true, navigate));
      } else {
        dispatch(setUser(user));
        blogService.setToken(user.token);
        const timeout = decodedToken.exp * 1000 - currentTime * 1000;
        logoutTimer = setTimeout(() => dispatch(logoutUser(true, navigate)), timeout);
      }
    }

    return () => clearTimeout(logoutTimer);
  }, [dispatch, navigate]);

};
