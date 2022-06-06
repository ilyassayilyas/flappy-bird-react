import React from "react";
import Bird from "./components/Bird/Bird";
import Board from "./components/Board/Board";
import { useState, useEffect } from "react";

const BOARD_HEIGHT = visualViewport.height;
const BIRD_SIZE = BOARD_HEIGHT / 10;
const GRAVITY = 10;
const BIRD_ROTATION_SPEED = GRAVITY / 10;
const JUMP_HEIGHT = BIRD_SIZE;
const SPIKES_HEIGHT = BOARD_HEIGHT / 10;

function Game() {
  const [birdTopPosition, setBirdTopPosition] = useState(
    BOARD_HEIGHT / 2 - BIRD_SIZE
  );
  const [birdRotation, setBirdRotation] = useState(0);
  const [gameHasStarted, setGameHasStarted] = useState(false);

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && birdTopPosition < BOARD_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdTopPosition((birdTopPosition) => birdTopPosition + GRAVITY);
        setBirdRotation((birdRotation) => {
          if (birdRotation > 60) return 60;
          return birdRotation + BIRD_ROTATION_SPEED;
        });
      }, 24);
    }
    return () => {
      clearInterval(timeId);
    };
  }, [birdRotation, birdTopPosition, gameHasStarted]);

  const handleClick = () => {
    let newBirdTopPosition = birdTopPosition - JUMP_HEIGHT;
    if (!gameHasStarted) {
      setGameHasStarted(true);
    } else if (newBirdTopPosition < SPIKES_HEIGHT / 4) {
      setBirdTopPosition(SPIKES_HEIGHT / 4);
      setBirdRotation(-45);
    } else {
      setBirdTopPosition(newBirdTopPosition);
      setBirdRotation(-45);
    }
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
