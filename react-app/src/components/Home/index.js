import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGenres } from "../../store/videos";
import GameCarousel from "../GameCarousel";

const Home = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.videos.genres);
  const [isLoaded, setIsLoaded] = useState(false);
  const popular = [1, 6, 12, 15, 19];

  useEffect(() => {
    dispatch(loadGenres()).then(() => setIsLoaded(true));
  }, []);
  return (
    isLoaded && (
      <>
        <h1>Popluar Genres</h1>
        {popular.map((el, idx) => {
          return (
            <>
              <h2>{genres[el].name}</h2>
              <GameCarousel key={idx} id={genres[el].id} />
            </>
          );
        })}
      </>
    )
  );
};

export default Home;
