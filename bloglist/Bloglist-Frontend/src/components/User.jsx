import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../redux/reducers/userReducer";
import Comments from "./Comments";

export default function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = useSelector(({ auth }) => auth.user);
  const loading = useSelector(({ users }) => users.loadingCurrentUser);
  const user = useSelector(({ users }) => users.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(id, userToken?.token));
  }, [dispatch, id, userToken?.token]);

  if (loading) {
    return <UserLoader />;
  }

  if (!user) {
    return <UserError />;
  }

  const blogList = user.blogs.map((blog) => {
    return (
      <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} <span className="small">{blog.author}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className="users-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <small className="back"> Back</small>
      </button>
      <div className="current-user">
        <h2>{user.username}</h2>
        <ul>{blogList.length > 0 ? blogList : "No blogs created yet"}</ul>
      </div>
    </div>
  );
}

const UserLoader = () => {
  return (
    <div className="current-user">
      <p>Loading...</p>
    </div>
  );
};

const UserError = () => {
  return (
    <div className="users">
      <p>User not found</p>
    </div>
  );
};
