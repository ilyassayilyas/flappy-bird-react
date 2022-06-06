import React from "react";
import Bird from "./components/Bird/Bird";
import Board from "./components/Board/Board";
import { useState, useEffect } from "react";

const BOARD_HEIGHT = visualViewport.height;
const BIRD_SIZE = BOARD_HEIGHT / 10;
const GRAVITY = 10;
const BIRD_ROTATION_SPEED = GRAVITY / 20;
const JUMP_HEIGHT = BIRD_SIZE;
const SPIKES_HEIGHT = BOARD_HEIGHT / 10;

function Game() {
  const [birdTopPosition, setBirdTopPosition] = useState(
    BOARD_HEIGHT / 2 - BIRD_SIZE
  );
  const [birdRotation, setBirdRotation] = useState(0);

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (birdTopPosition < BOARD_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdTopPosition((birdTopPosition) => birdTopPosition + GRAVITY);
        setBirdRotation((birdRotation) => birdRotation + BIRD_ROTATION_SPEED);
      }, 24);
    }
    if (birdRotation > 0) {
      return () => {
        clearInterval(timeId);
      };
    }
    return () => {
      clearInterval(timeId);
    };
  });

  const handleClick = () => {
    let newBirdTopPosition = birdTopPosition - JUMP_HEIGHT;
    setBirdTopPosition(newBirdTopPosition);
    setBirdRotation((birdRotation) => birdRotation + BIRD_ROTATION_SPEED * 2);
  };

  return (
    <div className="Game" onClick={handleClick}>
      <Board boardHeight={BOARD_HEIGHT} spikesHeight={SPIKES_HEIGHT}>
        <Bird size={BIRD_SIZE} top={birdTopPosition} rotation={birdRotation} />
      </Board>
    </div>
  );
}

export default Game;
