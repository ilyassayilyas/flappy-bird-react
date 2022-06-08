import styled from "styled-components";
import { isPropertySignature } from "typescript";
import Spikes from "../../img/spikes.gif";

type BoardProps = {
  children: React.ReactNode;
  boardHeight: number;
  spikesHeight: number;
};

const Board = (props: BoardProps) => {
  return (
    <BackgroundGradient boardHeight={props.boardHeight}>
      <BackgroundTopSpikes spikesHeight={props.spikesHeight} />
      {props.children}
      <BackgroundBottomSpikes spikesHeight={props.spikesHeight} />
    </BackgroundGradient>
  );
};

const BackgroundGradient = styled.div<{
  boardHeight: number;
}>`
  position: relative;
  display: flex;
  width: 100%;
  height: ${(props) => props.boardHeight}px;
  background-image: linear-gradient(to right, #00b4db, #0083b0);
`;

const BackgroundTopSpikes = styled.div<{ spikesHeight: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => props.spikesHeight}px;
  background-size: contain;
  width: 100%;
  background-image: url(${Spikes});
`;

const BackgroundBottomSpikes = styled.div<{ spikesHeight: number }>`
  z-index: 1;
  position: absolute;
  bottom: 0;
  transform: rotate(180deg);
  left: 0;
  height: ${(props) => props.spikesHeight}px;
  background-size: contain;
  width: 100%;
  background-image: url(${Spikes});
`;

export default Board;
