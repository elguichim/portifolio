// Tasks.tsx
import './Tasks.css';
import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const postitColors: string[] = [
  "#fff9c4", // amarelo claro
  "#c8e6c9", // verde claro
  "#bbdefb", // azul claro
  "#f8bbd0", // rosa claro
  "#ffe0b2", // laranja claro
  "#d1c4e9"  // lilás claro
];

interface MovableBlockProps {
  task: Task;
  removeTask: (id: number) => void;
  children?: React.ReactNode;
}

const MovableBlock: React.FC<MovableBlockProps> = ({ task, removeTask, children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.random() * 400,
    y: Math.random() * 400,
  });

  const [color] = useState<string>(
    postitColors[Math.floor(Math.random() * postitColors.length)]
  );

  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="movable-block"
      style={{
        left: position.x,
        top: position.y,
        position: "absolute",
        backgroundColor: color,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1>{task.title}</h1>

      <label className="task-line">
        <input type="checkbox" />
        <input type="text" placeholder="Digite aqui..." />
      </label>
      <label className="task-line">
        <input type="checkbox" />
        <input type="text" placeholder="Digite aqui..." />
      </label>
      <label className="task-line">
        <input type="checkbox" />
        <input type="text" placeholder="Digite aqui..." />
      </label>
      <label className="task-line">
        <input type="checkbox" />
        <input type="text" placeholder="Digite aqui..." />
      </label>

      <button onClick={() => removeTask(task.id)}>Excluir</button>
      {children}
    </div>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div className="tasks-voltar">
        <a href="/" className="project-link">Voltar</a>
        <button
          className="btn info-btn"
          onClick={() =>
            alert(
              "📌 Instruções de uso:\n\n" +
              "1. Digite uma nova tarefa no campo e clique em 'Adicionar'.\n" +
              "2. Cada tarefa aparece na lista e também como um post-it móvel.\n" +
              "3. Arraste os post-its para qualquer lugar do quadro.\n" +
              "4. Use os checkboxes e campos de texto dentro dos post-its para anotações rápidas.\n" +
              "5. Clique no título da tarefa na lista para marcar como concluída.\n" +
              "6. Use o botão 'Excluir' para remover tarefas ou post-its.\n" +
              "7. O botão 'Voltar' retorna para a página inicial."
            )
          }
        >
          Instruções
        </button>
      </div>

      <div className="tasks">
        <h1>Controle de Tarefas</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nova tarefa..."
          />
          <button onClick={addTask}>Adicionar</button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTask(task.id)}
              >
                {task.title}
              </span>
              <button onClick={() => removeTask(task.id)}>Excluir</button>
            </li>
          ))}
        </ul>

        {tasks.map((task) => (
          <MovableBlock key={task.id} task={task} removeTask={removeTask}>
            <p></p>
          </MovableBlock>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
