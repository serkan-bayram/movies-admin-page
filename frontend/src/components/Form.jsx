import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputSection from "./InputSection";
import Button from "./Button";
import Options from "./Options";
import Notifications from "./Notifications";
import axios from "axios";

const Form = (props) => {
  const [formValues, setFormValues] = useState({
    mName: "",
    poster: "",
    date: "",
    mId: "",
  });

  const [data, setData] = useState({});

  const [addBtn, setAddBtn] = useState(false);

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

  const convertDateFormat = (inputDate) => {
    // Split the input date into year, month, and day
    const [year, month, day] = inputDate.split("-");

    // Reformat the date as day-month-year
    const convertedDate = `${day}/${month}/${year}`;

    return convertedDate;
  };

  const fetchData = async (fetchUrl, fetchOption) => {
    try {
      const response = await fetch(fetchUrl);
      if (response.ok) {
        const responseData = await response.json();
        if (fetchOption === "movie") {
          setData(responseData);
          setAddBtn(true);
        } else if (fetchOption === "credits") {
          return responseData;
        }
      } else {
        console.error(`Error searching for ${fetchOption}`);
      }
    } catch (error) {
      console.error(`Error searching for ${fetchOption}`, error);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      // Show the first option once data is updated
      showData("1");
    }
  }, [data]);

  const handleFindClick = async () => {
    await fetchData(
      `http://localhost:5000/api/search?movieName=${encodeURIComponent(
        formValues.mName
      )}`,
      "movie"
    );
  };

  // Update formValues state when input values change
  const handleInputChange = (name, value) => {
    setFormValues({ [name]: value });
  };

  //dataOption selected button from 1 2 3 4 5
  const showData = (dataOption) => {
    const { results } = data; // data -> response from themoviedb
    try {
      const {
        // Results
        original_title: Title,
        poster_path: Poster,
        release_date: Date,
        id: Id,
        // -1 because we need the index but buttons say 1 2 3
      } = results[dataOption - 1];

      setFormValues({
        mName: Title,
        poster: Poster,
        date: convertDateFormat(Date),
        mId: Id,
      });

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

      props.showPoster("null");
      setAddBtn(false);
    }
  };

  const handleAddClick = async () => {
    try {
      const { mId, mName, date, poster } = formValues;

      const results = await fetchData(
        `http://localhost:5000/api/search?id=${encodeURIComponent(mId)}`,
        "credits"
      );

      // optimistic rendering
      props.handleAddClick({ ...formValues, ...results });
      setAddBtn(false);

      const [acting, directing] = results;
      const { directorName } = directing[0];

      const actors = [];
      const characters = [];

      acting.map((item) => {
        const { actorName, character } = item;
        actors.push(actorName);
        characters.push(character);
      });

      const postData = {
        movieId: `${mId}`,
        movieName: mName,
        releaseDate: date,
        director: directorName,
        actors: actors,
        characters: characters,
        posterPath: poster,
      };

      await axios.post("http://localhost:5000/api/movies/", postData);
    } catch (error) {
      console.error("Error creating movie:", error);
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
      <Button btnClicked={handleFindClick} content="Find" />
      {addBtn && <Button btnClicked={handleAddClick} content="Add" />}
      <Options optionsClicked={showData} />
      <Notifications notifications={notifications} />
    </form>
  );
};

export default Form;
