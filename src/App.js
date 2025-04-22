import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const addTodo = (text, dueDate, time) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      time,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>React Todo List</h1>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="current-time">
          {format(currentTime, 'EEEE, MMMM do yyyy')}
          <br />
          <span className="time">{format(currentTime, 'h:mm:ss a')}</span>
        </div>
      </header>
      <TodoForm onSubmit={addTodo} />
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
