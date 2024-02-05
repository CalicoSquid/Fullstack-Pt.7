import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import frontImage from "./assets/frontpage-2.png";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Message from "./components/Message";
import Modal from "./components/Modal";
import Bloglist from "./components/Bloglist";

import { initializeBlogs } from "../redux/reducers/blogReducer";
import { useAuthentication } from "../hooks";
import Users from "./components/Users";
import Home from "./components/Home";
import Blog from "./components/Blog";
import User from "./components/User";
import Footer from "./components/Footer";
import CreateAccount from "./components/CreateAccount";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const open = useSelector(({ tasks }) => tasks.loginModal.isOpen);
  useAuthentication();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="container">
        <Message />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Bloglist />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </div>

      <Footer />
      <Modal
        open={open}
        message={"Your session has expired, please log in to continue"}
        action={false}
      />
    </div>
  );
}

export default App;
