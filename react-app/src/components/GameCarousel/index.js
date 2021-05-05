import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCarousels } from "../../store/carousel";
import Slider from "react-slick";
import VideoCard from "../VideoCard";

const GameCarousel = ({ id }) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.carousels);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadCarousels(id)).then(() => setIsLoaded(true));
  }, [dispatch, id]);

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
              <VideoCard
                game={game.game}
                width="100%"
                height="100%"
                link={`/games/${game.id}`}
                idx={idx}
                image_path={game.image_path}
              />
            );
          })}
        </Slider>
      </>
    )
  );
};

export default GameCarousel;
