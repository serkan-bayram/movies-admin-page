import React from "react";
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
    </div>
  );
};

export default Information;
