import React, { useEffect, useState } from "react";
import FindSection from "./FindSection";
import GallerySection from "./GallerySection";

const App = () => {
  const [movieInfo, setMovieInfo] = useState({});

  const handleAddClick = (info) => {
    setMovieInfo(info);
  };

  return (
    <div className="flex h-screen w-screen">
      <FindSection handleAddClick={handleAddClick} />
      <GallerySection movieInfo={movieInfo} />
    </div>
  );
};

export default App;
