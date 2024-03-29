import { useNavigate, useParams } from "react-router-dom";
import { getBlogById } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import { openModal, setShowDetails } from "../../redux/reducers/tasksReducer";
import Comments from "./Comments";
import Loader from "./Loader";

export default function Blog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(({ users }) => users.loadingBlogs);
  const blog = useSelector(({ users }) => users.currentBlog);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(getBlogById(id));
    dispatch(setShowDetails(true));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return <BlogError />;
  }

  return (
    <div className="current-blog">
      <button className="back-button" onClick={() => navigate(-1)}>
        <small className="back"> Back</small>
      </button>
      <div className="current-blog-container col">
        <div className="card-container">
          <Card blog={blog} />
        </div>
        <div className="card-buttons flex">
          {user?.id === blog?.user.id && (
            <Button
              name="delete"
              label="Delete"
              onClick={() =>
                dispatch(openModal({ blogId: blog.id, modalType: "delete" }))
              }
              type="button"
            />
          )}
        </div>
      </div>
      <Comments />
    </div>
  );
}

const BlogError = () => {
  return <div className="loader">Blog not found</div>;
};
