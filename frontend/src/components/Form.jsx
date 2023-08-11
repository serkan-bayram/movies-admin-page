import React, { useState } from "react";
import InputSection from "./InputSection";
import Button from "./Button";
import Options from "./Options";

const Form = (props) => {
  const [formValues, setFormValues] = useState({
    mName: "",
  });
  const [data, setData] = useState({});

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/search?movieName=${encodeURIComponent(
          formValues.mName
        )}` // Sending a request to our route in server
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        console.error("Error searching for movies");
      }
    } catch (error) {
      console.error("Error searching for movies", error);
    }
  };

  // Update formValues state when input values change
  const handleInputChange = (name, value) => {
    setFormValues({ [name]: value });
  };

  //dataOption selected button from 1 2 3
  const showData = (dataOption) => {
    const { results } = data; // data -> response from themoviedb
    // -1 because we need the index but buttons say 1 2 3
    try {
      const selectedResult = results[dataOption - 1];
      const {
        // Results
        original_title: Title,
        poster_path: Poster,
        overview: Description,
        release_date: Year,
      } = selectedResult;
      setFormValues({ mName: Title }); // Show title
      props.showPoster(Poster); // sending poster path to FindSection component
    } catch {
      console.log(`Option ${dataOption} could not find.`);
    }
  };

  return (
    <form className="w-full pt-6">
      <InputSection
        name="mName"
        label="Movie name"
        value={formValues.mName}
        onInputChange={handleInputChange}
      />
      <Button btnClicked={handleClick} />
      <Options optionsClicked={showData} />
    </form>
  );
};

export default Form;
