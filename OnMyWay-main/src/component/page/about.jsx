import Footer from "../Footer";
import React, { useState } from "react";

function About() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => { 
    if (task.trim() === "") return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: task,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const moveUp = (index) => {
    if(index === 0) return;
    const newTodo = [...todos];
    [newTodo[index-1],newTodo[index]] = [newTodo[index],newTodo[index-1]]
    setTodos(newTodo);
  }

  const moveDown = (index) => {
    console.log(index);
    
    if(index === todos.length-1) return;
    const newTodo = [...todos];
    [newTodo[index],newTodo[index+1]] = [newTodo[index+1],newTodo[index]]
    setTodos(newTodo)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">📝 To-do List</h1>

      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add new task..."
        />
        <button
          onClick={addTodo}
          className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white px-4 py-2 rounded shadow"
          >
            <div
              onClick={() => toggleTodo(todo.id)}
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 px-2"
            >
              ✕
            </button>
            <button
              onClick={() => moveUp(index)}
              className="text-gray-500 hover:text-black px-2"
              title="Move Up"
            >
              ↑
            </button>
            <button
              onClick={() => moveDown(index)}
              className="text-gray-500 hover:text-black"
              title="Move Down"
            >
              ↓
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
