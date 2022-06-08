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

// const BottomObstacle = (props: BottomObstacleProps) => {
//   return (
//     <StyledBottomObstacle
//       height={props.height}
//       width={props.width}
//       left={props.left}
//     />
//   );
// };

// const StyledBottomObstacle = styled.div<{
//   height: number;
//   width: number;
//   left: number;
// }>`
//   position: absolute;
//   z-index: 2;
//   height: ${(props) => props.height}px;
//   background-image: url(${obstacle});
//   background-size: cover;
//   width: ${(props) => props.width}px;
//   bottom: 0;
//   left: ${(props) => props.left}px;
// `;

export default BottomObstacle;
