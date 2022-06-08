import style from "../styles/StaticStyling.module.css";

type TobObstacleProps = {
  height: number;
  width: number;
  left: number;
};

const dynamicStyles = (props: TobObstacleProps) => ({
  height: `${props.height}px`,
  width: `${props.width}px`,
  left: `${props.left}px`,
});

const TobObstacle = (props: TobObstacleProps) => {
  return (
    <div
      className={style.topObstacle}
      style={dynamicStyles(props) as React.CSSProperties}
    ></div>
  );
};

export default TobObstacle;
