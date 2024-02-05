import { useDispatch, useSelector } from "react-redux";
import Blogs from "./Blogs";
import Create from "./Create";
import Toggle from "./Toggle";
import { setShowDetails } from "../../redux/reducers/tasksReducer";
import { useEffect } from "react";

export default function Home() {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowDetails(false));
  }, [dispatch]);

  return (
    <div>
      {user && (
        <>
          <Toggle>
            <Create />
          </Toggle>
          <Blogs />
        </>
      )}
    </div>
  );
}
