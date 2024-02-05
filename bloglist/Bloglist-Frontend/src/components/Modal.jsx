import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { closeAndDelete, closeModal } from "../../redux/reducers/tasksReducer";
import { useNavigate } from "react-router-dom";

export default function Modal({ message, action, blog, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dialog
      id="modal"
      open={open}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogActions id="alert-dialog-actions">
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
        {action && (
          <Button
            onClick={() => dispatch(closeAndDelete(blog, navigate))}
            color="warning"
            autoFocus
            id="action"
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
