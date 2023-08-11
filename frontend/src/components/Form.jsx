import React, { useState } from "react";
import InputSection from "./InputSection";
import Button from "./Button";

const Form = (props) => {
  const [formValues, setFormValues] = useState({
    mName: "",
    director: "",
    year: "",
  });

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/search?movieName=${encodeURIComponent(
          formValues.mName
        )}&movieYear=${formValues.year}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error searching for movies");
      }
    } catch (error) {
      console.error("Error searching for movies", error);
    }
  };

  // Update formValues state when input values change
  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form className="w-full pt-6">
      <InputSection
        name="mName"
        label="Movie name"
        value={formValues.mName}
        onInputChange={handleInputChange}
      />
      <InputSection
        name="director"
        label="Director"
        value={formValues.director}
        onInputChange={handleInputChange}
      />
      <InputSection
        name="year"
        label="Year"
        value={formValues.year}
        onInputChange={handleInputChange}
      />
      <Button btnClicked={handleClick} />
    </form>
  );
};

export default Form;
