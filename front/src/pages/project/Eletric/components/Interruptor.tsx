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

const GRID_SIZE = 40;

const Interruptor: React.FC<Props> = ({ id, x, y, onDragMove, onStartConnection, onEndConnection, snapToGrid, onRemove }) => {
  const [switchImg] = useImage("/assets/interruptor.png");

  const handleStart = (px: number, py: number) => {
    const snapped = snapToGrid(px, py);
    onStartConnection(snapped.x, snapped.y);
  };

  const handleEnd = (px: number, py: number) => {
    const snapped = snapToGrid(px, py);
    onEndConnection(snapped.x, snapped.y);
  };

  return (
    <>
      <Image
        image={switchImg}
        x={x}
        y={y}
        width={GRID_SIZE * 2}
        height={GRID_SIZE}
        draggable
        onDragEnd={(e) => {
          const snapped = snapToGrid(e.target.x(), e.target.y());
          onDragMove(id, snapped.x, snapped.y);
        }}
        onDblClick={() => onRemove(id)}
      />
      {/* Ponto superior */}
      <Circle
        x={x + GRID_SIZE}
        y={y}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => handleStart(x + GRID_SIZE, y)}
        onMouseUp={() => handleEnd(x + GRID_SIZE, y)}
      />
      {/* Ponto inferior */}
      <Circle
        x={x + GRID_SIZE}
        y={y + GRID_SIZE}
        radius={6}
        fill="green"
        stroke="black"
        onMouseDown={() => handleStart(x + GRID_SIZE, y + GRID_SIZE)}
        onMouseUp={() => handleEnd(x + GRID_SIZE, y + GRID_SIZE)}
      />
    </>
  );
};

export default Interruptor;
