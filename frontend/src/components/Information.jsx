import React from "react";
import { v4 as uuidv4 } from "uuid";

import MovieInformation from "./MovieInformation";

const Information = (props) => {
  return (
    <div className="flex pt-2 gap-1 flex-wrap px-1 w-full">
      <MovieInformation
        theme="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        information={props.movieName === "" ? "Unknown" : props.movieName}
        content="movieName"
        hover={props.hover}
      />
      <MovieInformation
        theme="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        information={props.releaseDate === "" ? "Unknown" : props.releaseDate}
        content="releaseDate"
        hover={props.hover}
      />
      <MovieInformation
        theme="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        information={
          props.directing[0].directorName === ""
            ? "Unknown"
            : props.directing[0].directorName
        }
        content="directorName"
        hover={props.hover}
      />
      {props.acting.map((item) => {
        const { actorName, character } = item;
        return (
          <MovieInformation
            key={uuidv4()}
            theme="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            information={actorName === "" ? "Unknown" : actorName}
            content="actorName"
            character={character === "" ? "Unknown" : character}
            hover={props.hover}
          />
        );
      })}
    </div>
  );
};

export default Information;
