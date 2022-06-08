import React from "react";
import Bird from "./components/Bird/Bird";
import Board from "./components/Board/Board";
import { useState, useEffect } from "react";
import TopObstacle from "./components/Obstacles/TopObstacle";
import BottomObstacle from "./components/Obstacles/BottomObstacle";

const BOARD_HEIGHT = visualViewport.height;
const BOARD_WIDTH = visualViewport.width;
const BIRD_SIZE = BOARD_HEIGHT / 10;
const GRAVITY = 15;
const BIRD_ROTATION_SPEED = GRAVITY / 10;
const JUMP_HEIGHT = BIRD_SIZE;
const SPIKES_HEIGHT = BOARD_HEIGHT / 10;
const OBSTACLE_WIDTH = BIRD_SIZE * 3;
const GAP = BIRD_SIZE * 2;
const OBSTACLES_SPEED = 8;
const BIRID_LEFT_POSITION = BIRD_SIZE;

function Game() {
  const [birdTopPosition, setBirdTopPosition] = useState(
    BOARD_HEIGHT / 2 - BIRD_SIZE
  );
  const [birdRotation, setBirdRotation] = useState(0);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [topObstacleHeight, setTopObstacleHeight] = useState(900);
  const [obstacleLeft, setObstacleLeft] = useState(
    BOARD_WIDTH - OBSTACLE_WIDTH
  );

  let bottomObstacleHeight = BOARD_HEIGHT - GAP - topObstacleHeight;

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

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      timeId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - OBSTACLES_SPEED);
      }, 24);
      return () => {
        clearInterval(timeId);
      };
    } else {
      setObstacleLeft(BOARD_WIDTH - OBSTACLE_WIDTH);
      setTopObstacleHeight(600);
    }
  }, [gameHasStarted, obstacleLeft]);

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
        <TopObstacle
          height={topObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={obstacleLeft}
        />
        <Bird
          size={BIRD_SIZE}
          top={birdTopPosition}
          left={BIRID_LEFT_POSITION}
          rotation={birdRotation}
        />
        <BottomObstacle
          height={bottomObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={obstacleLeft}
        />
      </Board>
    </div>
  );
}

export default Game;
