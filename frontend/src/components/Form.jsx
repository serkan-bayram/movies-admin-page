import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputSection from "./InputSection";
import Button from "./Button";
import Options from "./Options";
import Notifications from "./Notifications";

const Form = (props) => {
  const [formValues, setFormValues] = useState({
    mName: "",
    poster: "",
    date: "",
    mId: "",
  });
  const [data, setData] = useState({});

  const [credits, setCredits] = useState({});

  const [addBtn, setAddBtn] = useState(false);

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/search?movieName=${encodeURIComponent(
          formValues.mName
        )}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        setAddBtn(true);
      } else {
        console.error("Error searching for movies");
      }
    } catch (error) {
      console.error("Error searching for movies", error);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      // Show the first option once data is updated
      showData("1");
    }
  }, [data]);

  const handleClick = async () => {
    await fetchMovie();
  };

  // Update formValues state when input values change
  const handleInputChange = (name, value) => {
    setFormValues({ [name]: value });
  };

  const [notifications, setNotifications] = useState([
    {
      id: "",
      content: "",
    },
  ]);

  const handleNotification = (notification) => {
    setNotifications((prevValues) => {
      return [
        ...prevValues,
        {
          id: uuidv4(),
          content: notification,
        },
      ];
    });
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
        release_date: Date,
        id: Id,
      } = selectedResult;
      const handleClick = async () => {
        await fetchMovie();
      };
      setFormValues({ mName: Title, poster: Poster, date: Date, mId: Id }); // Show title
      props.showPoster(Poster); // sending poster path to FindSection component
      if (!Poster) {
        // If there is no poster
        handleNotification("No poster has found.");
      }
      setAddBtn(true);
    } catch {
      if (dataOption === "1") {
        handleNotification("No movie has found.");
      } else {
        handleNotification(`Option ${dataOption} has not found.`);
      }
    }
  };

  const handleAddClick = async () => {
    const results = await fetchCredits();
    props.handleAddClick({ ...formValues, ...results });

    setAddBtn(false);
  };

  const fetchCredits = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/search?id=${encodeURIComponent(
          formValues.mId
        )}`
      );
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Error searching for credits");
      }
    } catch (error) {
      console.error("Error searching for credits", error);
    }
  };

  return (
    <form className="w-full pt-6">
      <InputSection
        name="mName"
        label="Movie Name"
        value={formValues.mName}
        onInputChange={handleInputChange}
      />
      <Button btnClicked={handleClick} content="Find" />
      {addBtn && <Button btnClicked={handleAddClick} content="Add" />}
      <Options optionsClicked={showData} />
      <Notifications notifications={notifications} />
    </form>
  );
};

export default Form;
