import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchVideoGames } from "../../store/videos";
import VideoCard from "../VideoCard";
import "./SearchResults.css";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const results = useSelector((state) => state.videos?.search);
  useEffect(() => {
    dispatch(searchVideoGames(searchTerm)).then(() => setIsLoaded(true));
  }, [searchTerm, dispatch]);

  return (
    isLoaded &&
    (results.length ? (
      <div className="grid-container">
        <div className="videocard-container">
          {results.map((game, idx) => {
            return (
              <VideoCard
                width="100%"
                height="100%"
                style={{ marign: "10px" }}
                game={game.game}
                link={`/games/${game.id}`}
                idx={idx}
                image_path={game.image_path}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <div className="not-found">
        <h1>
          Sorry, there doesn't seem to be any search results matching your
          query.
        </h1>
      </div>
    ))
  );
};

export default SearchResults;
