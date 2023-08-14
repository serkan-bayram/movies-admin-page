import React from "react";
import Notification from "./Notification";

const Notifications = (props) => {
  const { notifications } = props;

  return (
    <div
      id="toast-top-right"
      className="fixed space-y-2 w-full max-w-xs top-5 right-5"
      role="alert"
    >
      {notifications.map((notification) => {
        const { id, content } = notification;
        if (id !== "") {
          return <Notification key={id} content={content} />;
        } else {
          return <span key={id}></span>;
        }
      })}
    </div>
  );
};

export default Notifications;
