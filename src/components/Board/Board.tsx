import style from "../styles/StaticStyling.module.css";

type BoardProps = {
  children?: React.ReactNode;
  boardHeight?: number;
  spikesHeight?: number;
};

const backgroundGradientDynamicStyling = (props: BoardProps) => ({
  height: `${props.boardHeight}px`,
});

const Board = (props: BoardProps) => {
  return (
    <div
      className={style.backgroundGradient}
      style={backgroundGradientDynamicStyling(props)}
    >
      <div className={style.backAnimation}> </div>
      {props.children}
    </div>
  );
};

export default Board;
