import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [isHidden, setIsHidden] = useState(false);
  const [transition, setTransition] = useState(false);

  const timeout = 4000;
  const duration = 200;

  useEffect(() => {
    const hideNotification = setTimeout(() => {
      setIsHidden(true);
    }, timeout); // notification disappears after timeout seconds

    const startTransition = setTimeout(() => {
      setTransition(true);
    }, timeout - duration); // transition starts before notification disappears

    return () => {
      clearTimeout(hideNotification); // Clearing the timeout
      clearTimeout(startTransition);
    };
  }, []);

  if (isHidden) {
    return null; // Don't render anything if the notification is hidden, it works when isHidden sets to true
  } // It deletes the render from DOM

  return (
    <div
      className={`${
        transition ? `transition-opacity duration-200 ease-out opacity-0` : ""
      } flex items-center w-full p-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow  dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800`}
      role="alert"
    >
      <div className="text-sm font-normal">{props.content}</div>
    </div>
  );
};

export default Notification;
