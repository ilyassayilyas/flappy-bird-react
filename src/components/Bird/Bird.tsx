import style from "../styles/StaticStyling.module.css";

type BirdProps = {
  size: number;
  top: number;
  rotation: number;
  left: number;
};

const dynamicStyles = (props: BirdProps) => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
  transform: `rotate(${props.rotation}deg`,
  top: `${props.top}px`,
  left: `${props.left}px`,
});

const Bird = (props: BirdProps) => {
  return (
    <div
      className={style.bird}
      style={dynamicStyles(props) as React.CSSProperties}
    ></div>
  );
};

export default Bird;
