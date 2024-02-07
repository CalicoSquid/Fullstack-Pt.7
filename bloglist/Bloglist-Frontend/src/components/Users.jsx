import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Users() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const loading = useSelector(({ users }) => users.loadingUsers);
  const users = useSelector(({ users }) => users.allUsers);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers(user?.token));
  }, [dispatch, user?.token]);

  if (loading) {
    return <UserLoading />;
  }

  if (!users) {
    return <UserError />;
  }

  const userList = users.map((user) => {
    return (
      <li key={user.id}>
        <div className="user-list">
          <Link to={`/users/${user.id}`}>{user.username}</Link>
          <div className="user-blogs">
            <p>
              {user.blogs.length} {user.blogs.length > 1 ? "Blogs" : "Blog"}
            </p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="users-container">
      <button className="back-button" onClick={() => navigate("..")}>
        <small className="back"> Back</small>
      </button>
      <div className="users">
        <h2>Users</h2>
        <ul>{userList}</ul>
      </div>
    </div>
  );
}

const UserLoading = () => {
  return (
    <div className="users">
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
