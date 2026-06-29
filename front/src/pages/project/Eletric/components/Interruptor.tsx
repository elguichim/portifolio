import React from "react";
import { Circle, Image } from "react-konva";
import useImage from "use-image";

interface Props {
  id: number;
  x: number;
  y: number;
  onDragMove: (id: number, x: number, y: number) => void;
  onStartConnection: (x: number, y: number) => void;
  onEndConnection: (x: number, y: number) => void;
  snapToGrid: (x: number, y: number) => { x: number; y: number };
  onRemove: (id: number) => void;
}

const Interruptor: React.FC<Props> = ({ id, x, y, onDragMove, onStartConnection, onEndConnection, snapToGrid, onRemove }) => {
  const [switchImg] = useImage("/assets/interruptor.png");

  const width = 80;
  const height = 40;

  return (
    <>
      <Image
        image={switchImg}
        x={x}
        y={y}
        width={width}
        height={height}
        offsetX={width / 2}
        offsetY={height / 2}
        draggable
        onDragMove={(e) => {
          const snapped = snapToGrid(e.target.x(), e.target.y());
          e.target.x(snapped.x);
          e.target.y(snapped.y);
          onDragMove(id, snapped.x, snapped.y); // atualização imediata
        }}
        onDragEnd={(e) => {
          const snapped = snapToGrid(e.target.x(), e.target.y());
          onDragMove(id, snapped.x, snapped.y);
        }}
        onDblClick={() => onRemove(id)}
      />
      <Circle
        x={x}
        y={y - height / 2}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => onStartConnection(x, y - height / 2)}
        onMouseUp={() => onEndConnection(x, y - height / 2)}
      />
      <Circle
        x={x}
        y={y + height / 2}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => onStartConnection(x, y + height / 2)}
        onMouseUp={() => onEndConnection(x, y + height / 2)}
      />
    </>
  );
};

export default Interruptor;
