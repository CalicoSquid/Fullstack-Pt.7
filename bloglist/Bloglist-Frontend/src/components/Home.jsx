import React from "react";
import frontImage from "../assets/frontpage-2.png";
import Login from "./Login";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-info">
        <div className="home-text">
          <h1 className="home-title">Bloglist</h1>
          <p className="home-description">
          Made for the University of Helsinki Full Stack course, using <b>React</b>, <b>Redux</b>, <b>SASS</b>, and <b>MongoDB</b>.
            <br />
            <br />
          </p>
          {!user ? (
            <div className="login-home">
              <p>
                Username:<b>CalicoSquid</b>
                <br />
                Password: <b>12345678</b>
              </p>
              <Login />
            </div>
          ) : (
            <Button
              name="goto"
              label="View Blogs"
              onClick={() => navigate("/blogs")}
              type="button"
              loading={false}
            />
          )}
        </div>
      </div>
      <div className="img-div">
        <img src={frontImage} />
      </div>
    </div>
  );
}
