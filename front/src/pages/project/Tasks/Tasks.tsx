// Tasks.tsx
import './Tasks.css';
import React, { useState } from "react";
// import { Link } from 'react-router-dom';

// Interface que define o formato de uma tarefa
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Lista de cores suaves estilo post-it
const postitColors: string[] = [
  "#fff9c4", // amarelo claro
  "#c8e6c9", // verde claro
  "#bbdefb", // azul claro
  "#f8bbd0", // rosa claro
  "#ffe0b2", // laranja claro
  "#d1c4e9"  // lilás claro
];

// Props do bloco móvel
interface MovableBlockProps {
  task: Task;
  removeTask: (id: number) => void;
  children?: React.ReactNode;
}

// Componente que representa um bloco móvel individual
const MovableBlock: React.FC<MovableBlockProps> = ({ task, removeTask, children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.random() * 400,
    y: Math.random() * 400,
  });

  // Cada bloco recebe uma cor aleatória ao ser criado
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
        backgroundColor: color, // aplica cor aleatória
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >


      {/* Cabeçalho do bloco */}
      {/* 📝 Anotação */}
      <h1>{task.title}</h1>

      {/* Checklist dentro do bloco */}
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

      {/* Botão de excluir */}
      <button onClick={() => removeTask(task.id)}>Excluir</button>

      {/* Conteúdo extra passado como children */}
      {children}
    </div>
  );
};

// Componente principal de tarefas
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
    
    <div className="tasks">
      <div className='voltar'>
        <a href="/" className="project-link">volta</a>
      </div>
      <h1>Controle de Tarefas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button onClick={addTask}>Adicionar</button>

      {/* Lista simples de tarefas */}
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

      {/* Blocos móveis de anotações */}
      {tasks.map((task) => (
        <MovableBlock key={task.id} task={task} removeTask={removeTask}>
          <p></p>
        </MovableBlock>
      ))}
    </div>
  );
};

export default Tasks;
