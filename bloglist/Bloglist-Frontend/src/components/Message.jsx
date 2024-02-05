import { useSelector } from "react-redux";

export default function Message() {
  const { success, error } = useSelector(({ message }) => message);

  return (
    <div className="message-container">
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : success ? (
        <div className="success">
          <p>{success}</p>
        </div>
      ) : null}
    </div>
  );
}
