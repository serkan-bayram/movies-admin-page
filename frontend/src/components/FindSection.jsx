import React from "react";
import Poster from "./Poster";
import Form from "./Form";

const FindSection = () => {
  return (
    <section className="w-1/3 h-screen bg-black pt-6">
      <Poster type="main" />
      <Form />
    </section>
  );
};

export default FindSection;
