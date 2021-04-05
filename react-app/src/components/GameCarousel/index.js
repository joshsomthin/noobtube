import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCarousels } from "../../store/carousel";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

const GameCarousel = ({ id }) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.carousels);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadCarousels(id)).then(() => setIsLoaded(true));
  }, []);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    isLoaded && (
      <>
        <Slider {...settings}>
          {games[id].map((game, idx) => {
            return (
              <NavLink key={idx} to={`/games/${game.id}`}>
                <img
                  width="360"
                  height="200"
                  style={{ objectFit: "cover" }}
                  src={game.image_path}
                />
                <div>{game.game}</div>
              </NavLink>
            );
          })}
        </Slider>
      </>
    )
  );
};

export default GameCarousel;
