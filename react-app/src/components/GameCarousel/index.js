import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCarousels } from "../../store/carousel";

const GameCarousel = ({ id }) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.carousels);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadCarousels(id)).then(() => setIsLoaded(true));
  }, []);

  return (
    isLoaded && (
      <>
        {games[id].map((game, idx) => {
          return (
            <>
              <img width="360" height="200" src={game.image_path} />
              <div>{game.game}</div>
            </>
          );
        })}
      </>
    )
  );
};

export default GameCarousel;
