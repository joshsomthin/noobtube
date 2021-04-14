import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGenres } from "../../store/genres";
import GameCarousel from "../GameCarousel";

const Home = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [isLoaded, setIsLoaded] = useState(false);
  const popular = [1, 6, 12, 15];

  useEffect(() => {
    dispatch(loadGenres()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <>
        <h1>Popular Genres</h1>
        {popular.map((el, idx) => {
          return (
            <div key={idx}>
              <h2>{genres[el].name}</h2>
              <GameCarousel id={genres[el].id} />
            </div>
          );
        })}
      </>
    )
  );
};

export default Home;
