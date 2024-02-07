import { useSelector } from "react-redux";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const navigate = useNavigate();

  const blogs = useSelector(({ blogs }) => {
    return [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog, i) => {
        return (
          <div
            key={blog.id}
            className="clicker"
            onClick={() => navigate(`/blogs/${blog.id}`)}
          >
            <Card blog={blog} />
          </div>
        );
      });
  });

  return (
    <div className="blogs flex col">
      <div className="blog-container grid">{blogs}</div>
    </div>
  );
}
