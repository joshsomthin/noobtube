import React from "react";
import { useParams } from 'react-router-dom'

const GameVideos = () => {
  const { gameId } = useParams();

  return <div>Games Here</div>;
};

export default GameVideos;
