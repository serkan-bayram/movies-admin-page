import React, { useState } from "react";
import Poster from "./Poster";
import Form from "./Form";

const FindSection = (props) => {
  const [posterLink, setPosterLink] = useState("");

  const handleResponse = (posterPath) => {
    if (posterPath === null) {
      setPosterLink("null");
      return;
    }
    const link = "https://www.themoviedb.org/t/p/w1280" + posterPath;
    setPosterLink(link); // sending poster link to Poster component
  };

  const handleAddClick = (info) => {
    props.handleAddClick(info);
  };

  return (
    <section className="top-0 left-0 w-96 shrink-0 h-screen pt-6 bg-slate-900">
      <Poster posterLink={posterLink} type="main" />
      <Form handleAddClick={handleAddClick} showPoster={handleResponse} />
    </section>
  );
};

export default FindSection;
