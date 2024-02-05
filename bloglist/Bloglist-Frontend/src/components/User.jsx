import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../redux/reducers/userReducer";
import Comments from "./Comments";

export default function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = useSelector(({ auth }) => auth.user);
  const loading = useSelector(({ users }) => users.loadingCurrentUser);
  const user = useSelector(({ users }) => users.currentUser);

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
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </li>
    );
  });

  return (
    <div className="current-user">
      <Link to={".."} relative={"path"}>
        <small> Back</small>
      </Link>
      <h2>{user.username}</h2>
      <ul>{blogList.length > 0 ? blogList : "No blogs created yet"}</ul>
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
