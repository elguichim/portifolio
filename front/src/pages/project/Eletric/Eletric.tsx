import React, { useState } from "react";
import { Stage, Layer, Rect, Line, Circle } from "react-konva";
import Lampada from "./components/Lampada";
import Interruptor from "./components/Interruptor";
import Disjuntor from "./components/Disjuntor";
import Tomada from "./components/Tomada";
import ObjectList from "./ui/ObjectList";
import "./Eletric.css";

/* Tipos auxiliares */
interface Point {
  x: number;
  y: number;
}

interface ConnectionPath {
  points: Point[];
}

interface EletricObject {
  id: number;
  type: string;
  x: number;
  y: number;
}

const GRID_SIZE = 20;

const Eletric: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionPath[]>([]);
  const [tempPath, setTempPath] = useState<ConnectionPath | null>(null);
  const [objects, setObjects] = useState<EletricObject[]>([]);

  /* Funções utilitárias */
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
    setObjects(prev => [...prev, { id: Date.now(), type, x: startPos.x, y: startPos.y }]);
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
    <div className="eletric-layout">
      {/* Sidebar */}
      <div className="eletric-sidebar">
        <div className="button-group">
          <a href="/" className="btn">Voltar</a>
          <button
            className="btn info-btn"
            onClick={() =>
              alert(
                "Instruções de uso:\n\n" +
                "1. Arraste os componentes (lâmpada, interruptor, disjuntor, tomada) para o quadro de desenho.\n" +
                "2. Clique nos pontos verdes dos componentes para iniciar ou finalizar conexões.\n" +
                "3. As conexões aparecem como linhas pretas; você pode removê-las com duplo clique.\n" +
                "4. Enquanto cria uma conexão, uma linha vermelha tracejada mostra o caminho temporário.\n" +
                "5. Use o botão 'Voltar' para retornar à página inicial.\n" +
                "6. No Dashboard Financeiro, adicione categorias e transações (Entrada ou Saída).\n" +
                "7. Cada categoria mostra o total acumulado e pode ser selecionada para novas transações.\n" +
                "8. O resumo exibe Entrada, Saída e Saldo atualizados automaticamente.\n" +
                "9. O gráfico mostra a proporção entre receitas e despesas.\n" +
                "10. A lista de transações detalha cada operação registrada.\n\n" +
                "Dica: Em dispositivos móveis, arraste com o dedo e use os botões para navegar."
              )
            }
          >
            Instruções
          </button>

        </div>
        <ObjectList onAdd={handleAddObject} />
      </div>

      {/* Área principal */}
      <div className="eletric-main">
        <Stage
          className="eletric-stage"
          width={window.innerWidth}
          height={window.innerHeight}
          // width={800}
          // height={600}
          onMouseMove={(e) => {
            const pos = e.target.getStage()?.getPointerPosition();
            if (pos) handleMoveConnection(pos.x, pos.y);
          }}
        >
          <Layer>
            <Rect x={0} y={0} width={800} height={600} fill="#eaeaea" />

            {/* Grade */}
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

            {/* Conexões */}
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

            {/* Caminho temporário */}
            {tempPath && (
              <Line
                points={tempPath.points.flatMap(p => [p.x, p.y])}
                stroke="red"
                strokeWidth={2}
                dash={[4, 4]}
              />
            )}

            {/* Objetos */}
            {objects.map((obj) => {
              if (obj.type === "lampada") {
                return <Lampada key={obj.id} {...obj} onDragMove={handleDragMove} onStartConnection={handleStartConnection} onEndConnection={handleEndConnection} snapToGrid={snapToGrid} onRemove={handleRemoveObject} />;
              }
              if (obj.type === "interruptor") {
                return <Interruptor key={obj.id} {...obj} onDragMove={handleDragMove} onStartConnection={handleStartConnection} onEndConnection={handleEndConnection} snapToGrid={snapToGrid} onRemove={handleRemoveObject} />;
              }
              if (obj.type === "disjuntor") {
                return <Disjuntor key={obj.id} {...obj} onDragMove={handleDragMove} onStartConnection={handleStartConnection} onEndConnection={handleEndConnection} snapToGrid={snapToGrid} onRemove={handleRemoveObject} />;
              }
              if (obj.type === "tomada") {
                return <Tomada key={obj.id} {...obj} onDragMove={handleDragMove} onStartConnection={handleStartConnection} onEndConnection={handleEndConnection} snapToGrid={snapToGrid} onRemove={handleRemoveObject} />;
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
