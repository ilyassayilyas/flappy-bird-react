import style from "../styles/StaticStyling.module.css";

interface ScoreKeeperProps {
  score: number;
}

const ScoreKeeper = (props: ScoreKeeperProps) => {
  return <div className={style.scoreKeeper}>{props.score}</div>;
};

export default ScoreKeeper;
