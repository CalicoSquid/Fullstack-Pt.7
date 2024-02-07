import { useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLikes, voteBlogs } from "../../redux/reducers/tasksReducer";


export default function Card({ blog }) {
  const dispatch = useDispatch();

  const showDetails = useSelector(({ tasks }) => tasks.showDetails);
  const likes = useSelector(({ tasks }) => tasks.likes[blog.id] || 0);
  const open = useSelector(
    ({ tasks }) => tasks.blogModal[blog.id]?.isOpen || false
  );

  useEffect(() => {
    dispatch(setLikes({ blogId: blog.id, likes: blog.likes }));
  }, [dispatch, blog.id, blog.likes]);

  return (
    <div className="card flex">
      <div className=" likes flex col">
        <>
          {showDetails && (
            <Button
              name="vote up"
              label="▲"
              onClick={() => dispatch(voteBlogs(blog, likes + 1))}
              type="button"
            />
          )}
          <div className="likes-text">
            <p>{likes}</p>
            <small>Likes</small>
          </div>
          {showDetails && (
            <Button
              name="vote down"
              label="▼"
              onClick={() => dispatch(voteBlogs(blog, likes - 1))}
              type="button"
            />
          )}
        </>
      </div>
      <div className=" blog flex col">
        <h1 className="blog-title">{blog.title}</h1>
        <p>Written By {blog.author}</p>
        {showDetails && <a href={blog.url} target="_blank" rel="noopener noreferrer">Visit blog</a>}
        <div className="user">{blog?.user?.username}</div>
      </div>
      <Modal
        open={open}
        blog={blog}
        message={`Are you sure you want to delete ${blog.title}?`}
        action={true}
      />
    </div>
  );
}
