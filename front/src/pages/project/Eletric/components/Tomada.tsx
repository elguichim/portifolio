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

const Tomada: React.FC<Props> = ({ id, x, y, onDragMove, onStartConnection, onEndConnection, snapToGrid, onRemove }) => {
  const [socketImg] = useImage("/assets/tomada.png");

  const width = 60;
  const height = 60;

  return (
    <>
      <Image
        image={socketImg}
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
        x={x - width / 2}
        y={y}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => onStartConnection(x - width / 2, y)}
        onMouseUp={() => onEndConnection(x - width / 2, y)}
      />
      <Circle
        x={x + width / 2}
        y={y}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => onStartConnection(x + width / 2, y)}
        onMouseUp={() => onEndConnection(x + width / 2, y)}
      />
    </>
  );
};

export default Tomada;
