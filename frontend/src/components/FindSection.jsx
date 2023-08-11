import React, { useState } from "react";
import Poster from "./Poster";
import Form from "./Form";

const FindSection = () => {
  const [posterLink, setPosterLink] = useState("");

  const handleResponse = (posterPath) => {
    const link = "https://www.themoviedb.org/t/p/w1280" + posterPath;
    setPosterLink(link); // sending poster link to Poster component
  };

  return (
    <section className="w-96 min-w-0 h-screen bg-black pt-6">
      <Poster posterLink={posterLink} type="main" />
      <Form showPoster={handleResponse} />
    </section>
  );
};

export default FindSection;
