import style from "../styles/StaticStyling.module.css";

type BoardProps = {
  children?: React.ReactNode;
  boardHeight?: number;
  spikesHeight?: number;
};

const backgroundGradientDynamicStyling = (props: BoardProps) => ({
  height: `${props.boardHeight}px`,
});

const spikesDynamicStyling = (props: BoardProps) => ({
  height: `${props.spikesHeight}px`,
});

const Board = (props: BoardProps) => {
  return (
    <div
      className={style.backgroundGradient}
      style={backgroundGradientDynamicStyling(props)}
    >
      <div
        className={style.topSpikes}
        style={spikesDynamicStyling(props)}
      ></div>
      {props.children}
      <div
        className={style.bottomSpikes}
        style={spikesDynamicStyling(props)}
      ></div>
    </div>
  );
};

export default Board;
