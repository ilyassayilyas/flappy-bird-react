import React from "react";
import Bird from "./components/Bird/Bird";
import Board from "./components/Board/Board";
import { useState, useEffect } from "react";
import TopObstacle from "./components/Obstacles/TopObstacle";
import BottomObstacle from "./components/Obstacles/BottomObstacle";
import ScoreKeeper from "./components/ScoreKeeper/ScoreKeeper";
import StartMenu from "./components/menu/StartMenu";
import style from "./components/styles/StaticStyling.module.css";

const GRAVITY = 20;

const BOARD_HEIGHT = visualViewport.height;
const BOARD_WIDTH = visualViewport.width;

const BIRD_SIZE = BOARD_HEIGHT / 10;
const BIRD_ROTATION_SPEED = GRAVITY / 10;
const JUMP_HEIGHT = BIRD_SIZE * 1.5;
const BIRID_LEFT_POSITION = BIRD_SIZE;

const GAP = BIRD_SIZE * 3;
const OBSTACLE_WIDTH = BIRD_SIZE * 3;
const OBSTACLES_SPEED = 15;

const MENU_HEIGHT = BOARD_HEIGHT / 3;
const MENU_WIDTH = BOARD_WIDTH / 5;

function Game() {
  const minObstacleHeight = 400;
  const maxObstacleHeight = Math.floor(Math.random() * (BOARD_HEIGHT / 1.75));

  const [birdTopPosition, setBirdTopPosition] = useState(
    BOARD_HEIGHT / 2 - BIRD_SIZE
  );
  const [birdRotation, setBirdRotation] = useState(0);

  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameHasOver, setGameHasOver] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState("flex");
  const [score, setScore] = useState(0);

  const [topObstacleHeight, setTopObstacleHeight] = useState(BOARD_HEIGHT / 2);
  const [obstacleLeft, setObstacleLeft] = useState(
    BOARD_WIDTH + OBSTACLE_WIDTH
  );
  let bottomObstacleHeight = BOARD_HEIGHT - GAP - topObstacleHeight;

  const [secondTopObstacleHeight, setSecondTopObstacleHeight] = useState(
    BOARD_HEIGHT / 4
  );
  let secondBottomObstacleHeight = BOARD_HEIGHT - GAP - secondTopObstacleHeight;
  const [secondObstacleLeft, setSecondObstacleLeft] = useState(
    BOARD_WIDTH + 2.75 * OBSTACLE_WIDTH
  );

  const [thirdTopObstacleHeight, setThirdTopObstacleHeight] = useState(
    BOARD_HEIGHT / 3
  );
  let thirdBottomObstacleHeight = BOARD_HEIGHT - GAP - thirdTopObstacleHeight;
  const [thirdObstacleLeft, setThirdObstacleLeft] = useState(
    BOARD_WIDTH + 4.5 * OBSTACLE_WIDTH
  );

  const [fourthTopObstacleHeight, setFourthTopObstacleHeight] = useState(
    BOARD_HEIGHT / 5
  );
  let fourthBottomObstacleHeight = BOARD_HEIGHT - GAP - fourthTopObstacleHeight;
  const [fourthObstacleLeft, setFourthObstacleLeft] = useState(
    BOARD_WIDTH + 6.25 * OBSTACLE_WIDTH
  );

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      timeId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - OBSTACLES_SPEED);
      }, 24);
      return () => {
        clearInterval(timeId);
      };
    } else if (obstacleLeft < 0) {
      setScore((score) => score + 1);
      setObstacleLeft(BOARD_WIDTH);
      setTopObstacleHeight(Math.max(maxObstacleHeight, minObstacleHeight));
    }
  }, [gameHasStarted, obstacleLeft, maxObstacleHeight]);

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && secondObstacleLeft >= -OBSTACLE_WIDTH) {
      timeId = setInterval(() => {
        setSecondObstacleLeft(
          (secondObstacleLeft) => secondObstacleLeft - OBSTACLES_SPEED
        );
      }, 24);
      return () => {
        clearInterval(timeId);
      };
    } else if (secondObstacleLeft < 0) {
      setScore((score) => score + 1);
      setSecondObstacleLeft(BOARD_WIDTH);
      setSecondTopObstacleHeight(
        Math.max(maxObstacleHeight, minObstacleHeight)
      );
    }
  }, [gameHasStarted, secondObstacleLeft, maxObstacleHeight]);

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && thirdObstacleLeft >= -OBSTACLE_WIDTH) {
      timeId = setInterval(() => {
        setThirdObstacleLeft(
          (thirdObstacleLeft) => thirdObstacleLeft - OBSTACLES_SPEED
        );
      }, 24);
      return () => {
        clearInterval(timeId);
      };
    } else if (thirdObstacleLeft < 0) {
      setScore((score) => score + 1);
      setThirdObstacleLeft(BOARD_WIDTH);
      setThirdTopObstacleHeight(Math.max(maxObstacleHeight, minObstacleHeight));
    }
  }, [gameHasStarted, thirdObstacleLeft, maxObstacleHeight]);

  useEffect(() => {
    let timeId: NodeJS.Timer;
    if (gameHasStarted && fourthObstacleLeft >= -OBSTACLE_WIDTH) {
      timeId = setInterval(() => {
        setFourthObstacleLeft(
          (fourthObstacleLeft) => fourthObstacleLeft - OBSTACLES_SPEED
        );
      }, 24);
      return () => {
        clearInterval(timeId);
      };
    } else if (fourthObstacleLeft < 0) {
      setScore((score) => score + 1);
      setFourthObstacleLeft(BOARD_WIDTH);
      setFourthTopObstacleHeight(
        Math.max(maxObstacleHeight, minObstacleHeight)
      );
    }
  }, [gameHasStarted, fourthObstacleLeft, maxObstacleHeight]);

  useEffect(() => {
    const isFirstTopCollision =
      birdTopPosition >= 0 &&
      birdTopPosition < topObstacleHeight - 0.0625 * BIRD_SIZE;
    const isFirstBottomCollision =
      birdTopPosition <= BOARD_HEIGHT &&
      birdTopPosition > BOARD_HEIGHT - bottomObstacleHeight - BIRD_SIZE / 1.5;
    if (
      obstacleLeft >= BIRID_LEFT_POSITION - 1.5 * BIRD_SIZE &&
      obstacleLeft <= OBSTACLE_WIDTH - 1.5 * BIRID_LEFT_POSITION &&
      (isFirstBottomCollision || isFirstTopCollision)
    ) {
      setGameHasOver(true);
    }
  }, [
    obstacleLeft,
    bottomObstacleHeight,
    topObstacleHeight,
    birdTopPosition,
    gameHasOver,
  ]);

  useEffect(() => {
    const isSecondTopCollision =
      birdTopPosition >= 0 &&
      birdTopPosition < secondTopObstacleHeight - 0.0625 * BIRD_SIZE;
    const isSecondBottomCollision =
      birdTopPosition <= BOARD_HEIGHT &&
      birdTopPosition >
        BOARD_HEIGHT - secondBottomObstacleHeight - BIRD_SIZE / 1.5;
    if (
      secondObstacleLeft >= BIRID_LEFT_POSITION - 1.5 * BIRD_SIZE &&
      secondObstacleLeft <= OBSTACLE_WIDTH - 1.5 * BIRID_LEFT_POSITION &&
      (isSecondBottomCollision || isSecondTopCollision)
    ) {
      setGameHasOver(true);
    }
  }, [
    secondObstacleLeft,
    secondBottomObstacleHeight,
    secondTopObstacleHeight,
    birdTopPosition,
    gameHasOver,
  ]);

  useEffect(() => {
    const isThirdTopCollision =
      birdTopPosition >= 0 &&
      birdTopPosition < thirdTopObstacleHeight - 0.0625 * BIRD_SIZE;
    const isThirdBottomCollision =
      birdTopPosition <= BOARD_HEIGHT &&
      birdTopPosition >
        BOARD_HEIGHT - thirdBottomObstacleHeight - BIRD_SIZE / 1.5;
    if (
      thirdObstacleLeft >= BIRID_LEFT_POSITION - 1.5 * BIRD_SIZE &&
      thirdObstacleLeft <= OBSTACLE_WIDTH - 1.5 * BIRID_LEFT_POSITION &&
      (isThirdBottomCollision || isThirdTopCollision)
    ) {
      setGameHasOver(true);
    }
  }, [
    thirdObstacleLeft,
    thirdBottomObstacleHeight,
    thirdTopObstacleHeight,
    birdTopPosition,
    gameHasOver,
  ]);

  useEffect(() => {
    const isFourthTopCollision =
      birdTopPosition >= 0 &&
      birdTopPosition < fourthTopObstacleHeight - 0.0625 * BIRD_SIZE;
    const isFourthBottomCollision =
      birdTopPosition <= BOARD_HEIGHT &&
      birdTopPosition >
        BOARD_HEIGHT - fourthBottomObstacleHeight - BIRD_SIZE / 1.5;
    if (
      fourthObstacleLeft >= BIRID_LEFT_POSITION - 1.5 * BIRD_SIZE &&
      fourthObstacleLeft <= OBSTACLE_WIDTH - 1.5 * BIRID_LEFT_POSITION &&
      (isFourthBottomCollision || isFourthTopCollision)
    ) {
      setGameHasOver(true);
    }
  }, [
    fourthObstacleLeft,
    fourthBottomObstacleHeight,
    fourthTopObstacleHeight,
    birdTopPosition,
    gameHasOver,
  ]);

  useEffect(() => {
    if (gameHasOver) {
      setGameHasStarted(false);
      setMenuVisibility("flex");
    } else if (!gameHasOver) {
      setMenuVisibility("none");
    }
  }, [gameHasOver]);

  useEffect(() => {
    if (!gameHasStarted) {
      setMenuVisibility("flex");
    } else {
      setMenuVisibility("none");
    }
  }, [gameHasStarted]);

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
  }, [gameHasStarted, birdRotation, birdTopPosition]);

  const handleClick = () => {
    let newBirdTopPosition = birdTopPosition - JUMP_HEIGHT;
    if (!gameHasOver && gameHasStarted) {
      if (newBirdTopPosition < 0) {
        setBirdTopPosition(0);
        setBirdRotation(-45);
      } else {
        setBirdTopPosition(newBirdTopPosition);
        setBirdRotation(-45);
      }
    }
  };
  const restartGame = () => {
    setScore(0);
    setBirdTopPosition(BOARD_HEIGHT / 2 - BIRD_SIZE);
  };

  const handleButtonClick = () => {
    if (!gameHasStarted && !gameHasOver) {
      setGameHasStarted(true);
    }
    if (gameHasOver) {
      setObstacleLeft(BOARD_WIDTH + OBSTACLE_WIDTH);
      setSecondObstacleLeft(BOARD_WIDTH + 2.75 * OBSTACLE_WIDTH);
      setThirdObstacleLeft(BOARD_WIDTH + 4.5 * OBSTACLE_WIDTH);
      setFourthObstacleLeft(BOARD_WIDTH + 6.25 * OBSTACLE_WIDTH);
      setGameHasOver(false);
      setGameHasStarted(true);
      restartGame();
    }
  };

  return (
    <div className="Game" onClick={handleClick}>
      <Board boardHeight={BOARD_HEIGHT}>
        <TopObstacle
          height={topObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={obstacleLeft}
        />
        <TopObstacle
          height={secondTopObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={secondObstacleLeft}
        />
        <TopObstacle
          height={thirdTopObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={thirdObstacleLeft}
        />
        <TopObstacle
          height={fourthTopObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={fourthObstacleLeft}
        />
        <StartMenu
          height={MENU_HEIGHT}
          width={MENU_WIDTH}
          display={menuVisibility}
        >
          <h1 className={style.menuHeading}>
            {gameHasOver ? "Game Over" : "New Game"}
          </h1>
          <button className={style.menuBtn} onClick={handleButtonClick}>
            {gameHasOver ? "Restart" : "Start"}
          </button>
        </StartMenu>
        <ScoreKeeper score={score} />
        <Bird
          size={BIRD_SIZE}
          top={birdTopPosition}
          left={BIRID_LEFT_POSITION}
          rotation={birdRotation}
        />
        <BottomObstacle
          height={fourthBottomObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={fourthObstacleLeft}
        />
        <BottomObstacle
          height={thirdBottomObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={thirdObstacleLeft}
        />
        <BottomObstacle
          height={secondBottomObstacleHeight}
          width={OBSTACLE_WIDTH}
          left={secondObstacleLeft}
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
