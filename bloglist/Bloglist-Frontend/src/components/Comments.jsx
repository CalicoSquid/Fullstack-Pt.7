import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  commentBlogs,
  deleteComments,
  setComments,
} from "../../redux/reducers/tasksReducer";
import user from "../assets/user.png";

export default function Comments() {
  const dispatch = useDispatch();
  const comment = useSelector(({ tasks }) => tasks.comments);
  const blog = useSelector(({ users }) => users.currentBlog);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentBlogs(blog, comment));
  };

  const commentList = blog.comments.map((comment) => {
    const formattedDate = new Date(comment.time).toLocaleString();

    return (
      <li key={comment._id}>
        <div className="comment">
          <div className="user-comment flex">
            <img src={user} alt="user" style={{ height: "40px" }} />
            <div className="comment-info flex col">
              <small>{formattedDate}</small>
              <p>{comment.text}</p>
            </div>
          </div>
          <Button
            name="delete"
            label="Delete"
            type="button"
            onClick={() => dispatch(deleteComments(blog, comment._id))}
          />
        </div>
        <hr />
      </li>
    );
  });

  return (
    <div className="comments current-blog-container flex col">
      <h2>Comments</h2>
      <form action="submit" className="comment-form flex">
        <textarea
          id="comment"
          className="comment-input input"
          placeholder="Add your comment..."
          onChange={(e) => dispatch(setComments(e.target.value))}
          value={comment}
        />
        <Button
          name="comment-btn"
          label="Comment"
          type="submit"
          onClick={handleComment}
        />
      </form>
      <br />
      <ul>{commentList}</ul>
    </div>
  );
}
