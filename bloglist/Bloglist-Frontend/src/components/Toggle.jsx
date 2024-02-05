import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/reducers/toggleReducer";

export default function Toggle({ children }) {
  const dispatch = useDispatch();
  const visibility = useSelector(({ toggle }) => toggle.isOpen);

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  return (
    <div className="toggle flex col">
      <div className="open-toggle" style={showWhenVisible}>
        <Button
          name="toggle-button"
          label="Add Blog"
          onClick={() => dispatch(toggle())}
          type="button"
        />
      </div>
      <div className="close-toggle flex col" style={hideWhenVisible}>
        {children}
      </div>
    </div>
  );
}
