import React from "react";
import { v4 as uuidv4 } from "uuid";

import MovieInformation from "./MovieInformation";

const Information = (props) => {
  const { movieName, releaseDate, hover, directing, acting } = props;

  return (
    <div className="flex pt-2 gap-1 flex-wrap px-1 w-full">
      <MovieInformation
        theme="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        information={movieName || "Unknown"}
        content="movieName"
        hover={hover}
      />
      <MovieInformation
        theme="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        information={releaseDate || "Unknown"}
        content="releaseDate"
        hover={hover}
      />
      <MovieInformation
        theme="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        information={(directing && directing[0]?.directorName) || "Unknown"}
        content="directorName"
        hover={hover}
      />
      {acting ? (
        acting.map((item) => {
          const { actorName, character } = item;
          return (
            <MovieInformation
              key={uuidv4()}
              theme="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              information={actorName || "Unknown"}
              content="actorName"
              character={character || "Unknown"}
              hover={hover}
            />
          );
        })
      ) : (
        <MovieInformation
          key={uuidv4()}
          theme="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
          information="Unknown"
          content="actorName"
          character="Unknown"
          hover={hover}
        />
      )}
    </div>
  );
};

export default Information;
