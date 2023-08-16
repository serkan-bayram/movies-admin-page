import React, { useEffect, useState } from "react";
import FindSection from "./FindSection";
import GallerySection from "./GallerySection";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const [notification, setNotification] = useState({});

  const handleAddClick = (info) => {
    setMovieInfo(info);
  };

  const handleNotification = (content) => {
    setNotification(content);
  };

  const [keyPressed, setKeyPressed] = useState("");
  const [isKeyPressed, setIsKeyPressed] = useState("");

  useEffect(() => {
    const handleKey = (event) => {
      console.log(event.key);
      if (event.key === "f") {
        setKeyPressed("f");
        setIsKeyPressed(uuidv4());
      } else if (event.key === "a") {
        setKeyPressed("a");
        setIsKeyPressed(uuidv4());
      } else if (event.key === "Escape") {
        setKeyPressed("esc");
        setIsKeyPressed(uuidv4());
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <FindSection
        handleAddClick={handleAddClick}
        notification={notification}
        keyPressed={keyPressed}
        isKeyPressed={isKeyPressed}
      />
      <GallerySection movieInfo={movieInfo} notification={handleNotification} />
    </div>
  );
};

export default App;
