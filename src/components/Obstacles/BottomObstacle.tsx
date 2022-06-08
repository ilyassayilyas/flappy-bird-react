import style from "../styles/StaticStyling.module.css";

type BottomObstacleProps = {
  height: number;
  width: number;
  left: number;
};

const dynamicStyles = (props: BottomObstacleProps) => ({
  height: `${props.height}px`,
  width: `${props.width}px`,
  left: `${props.left}px`,
});

const BottomObstacle = (props: BottomObstacleProps) => {
  return (
    <div
      className={style.bottomObstacle}
      style={dynamicStyles(props) as React.CSSProperties}
    ></div>
  );
};

export default BottomObstacle;
