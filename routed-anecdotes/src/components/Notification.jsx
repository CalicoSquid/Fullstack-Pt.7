import React from "react";

export default function Notification({ message }) {
  if (!message) {
    return <p></p>;
  }
  return (
    <div className="notification">
      <p className={message.error ? "error" : "success"}>
        {message.error ? message.error : message.success}
      </p>
    </div>
  );
}
