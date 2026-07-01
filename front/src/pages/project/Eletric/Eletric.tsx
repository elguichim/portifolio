import React, { useState } from "react";
import { Stage, Layer, Rect, Line, Circle } from "react-konva";
import Lampada from "./components/Lampada";
import Interruptor from "./components/Interruptor";
import Disjuntor from "./components/Disjuntor";
import Tomada from "./components/Tomada";   // 🔧 NOVO: importamos o componente Tomada
import ObjectList from "./ui/ObjectList";
import { Link } from 'react-router-dom';

interface Point {
  x: number;
  y: number;
}

interface ConnectionPath {
  points: Point[];
}

// 🔧 ALTERAÇÃO: diminuímos o tamanho da célula da grade
const GRID_SIZE = 20; // antes era 40

const Eletric: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionPath[]>([]);
  const [tempPath, setTempPath] = useState<ConnectionPath | null>(null);
  const [objects, setObjects] = useState<{ id: number; type: string; x: number; y: number }[]>([]);

  const snapToGrid = (x: number, y: number): Point => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  });

  const handleStartConnection = (x: number, y: number) => {
    const snapped = snapToGrid(x, y);
    setTempPath({ points: [snapped] });
  };

  const handleMoveConnection = (x: number, y: number) => {
    if (tempPath) {
      const snapped = snapToGrid(x, y);
      const last = tempPath.points[tempPath.points.length - 1];
      if (last.x !== snapped.x || last.y !== snapped.y) {
        setTempPath({ points: [...tempPath.points, snapped] });
      }
    }
  };

  const handleEndConnection = (x: number, y: number) => {
    if (tempPath) {
      const snapped = snapToGrid(x, y);
      setConnections(prev => [...prev, { points: [...tempPath.points, snapped] }]);
      setTempPath(null);
    }
  };

  const handleAddObject = (type: string) => {
    const startPos = snapToGrid(100, 100);
    setObjects((prev) => [...prev, { id: Date.now(), type, x: startPos.x, y: startPos.y }]);
  };

  const handleDragMove = (id: number, x: number, y: number) => {
    const snapped = snapToGrid(x, y);
    setObjects(prev =>
      prev.map(obj => (obj.id === id ? { ...obj, x: snapped.x, y: snapped.y } : obj))
    );
  };

  const handleRemoveObject = (id: number) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className='voltar'>
        <Link to="/" className="project-link">Ver Projeto</Link>
      </div>
      <div style={{ width: "200px", background: "#333", color: "#fff", padding: "10px" }}>
        <ObjectList onAdd={handleAddObject} />
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Stage
          width={800}
          height={600}
          onMouseMove={(e) => {
            const pos = e.target.getStage()?.getPointerPosition();
            if (pos) handleMoveConnection(pos.x, pos.y);
          }}
        >
          <Layer>
            <Rect x={0} y={0} width={800} height={600} fill="#eaeaea" />

            {Array.from({ length: 800 / GRID_SIZE }).map((_, i) =>
              Array.from({ length: 600 / GRID_SIZE }).map((_, j) => (
                <Circle
                  key={`${i}-${j}`}
                  x={i * GRID_SIZE}
                  y={j * GRID_SIZE}
                  radius={2}
                  fill="#999"
                  opacity={0.3}
                />
              ))
            )}

            {connections.map((c, i) => (
              <Line
                key={i}
                points={c.points.flatMap(p => [p.x, p.y])}
                stroke="black"
                strokeWidth={2}
                onDblClick={() => {
                  setConnections(prev => prev.filter((_, idx) => idx !== i));
                }}
              />
            ))}

            {tempPath && (
              <Line
                points={tempPath.points.flatMap(p => [p.x, p.y])}
                stroke="red"
                strokeWidth={2}
                dash={[4, 4]}
              />
            )}

            {objects.map((obj) => {
              if (obj.type === "lampada") {
                return (
                  <Lampada
                    key={obj.id}
                    {...obj}
                    onDragMove={handleDragMove}
                    onStartConnection={handleStartConnection}
                    onEndConnection={handleEndConnection}
                    snapToGrid={snapToGrid}
                    onRemove={handleRemoveObject}
                  />
                );
              }
              if (obj.type === "interruptor") {
                return (
                  <Interruptor
                    key={obj.id}
                    {...obj}
                    onDragMove={handleDragMove}
                    onStartConnection={handleStartConnection}
                    onEndConnection={handleEndConnection}
                    snapToGrid={snapToGrid}
                    onRemove={handleRemoveObject}
                  />
                );
              }
              if (obj.type === "disjuntor") {
                return (
                  <Disjuntor
                    key={obj.id}
                    {...obj}
                    onDragMove={handleDragMove}
                    onStartConnection={handleStartConnection}
                    onEndConnection={handleEndConnection}
                    snapToGrid={snapToGrid}
                    onRemove={handleRemoveObject}
                  />
                );
              }
              if (obj.type === "tomada") {   // 🔧 NOVO: adicionamos suporte ao componente Tomada
                return (
                  <Tomada
                    key={obj.id}
                    {...obj}
                    onDragMove={handleDragMove}
                    onStartConnection={handleStartConnection}
                    onEndConnection={handleEndConnection}
                    snapToGrid={snapToGrid}
                    onRemove={handleRemoveObject}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Eletric;
