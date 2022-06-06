import styled from "styled-components";
import birdGif from "../../img/Bird.gif";

type BirdProps = {
  size: number;
  top: number;
  rotation: number;
};

const Bird = (props: BirdProps) => {
  return (
    <StyledBird size={props.size} top={props.top} rotation={props.rotation} />
  );
};

const StyledBird = styled.div<{ size: number; top: number; rotation: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  background-image: url(${birdGif});
  background-size: cover;
  position: absolute;
  transform: rotate(${(props) => props.rotation}deg);
  top: ${(props) => props.top}px;
  left: calc(1.5 * ${(props) => props.size}px);
`;

export default Bird;
