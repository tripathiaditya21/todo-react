import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const CATEGORIES = [
  { id: 'work', name: 'Work', emoji: '💼', color: '#3498db' },
  { id: 'personal', name: 'Personal', emoji: '🏠', color: '#2ecc71' },
  { id: 'shopping', name: 'Shopping', emoji: '🛒', color: '#e74c3c' },
  { id: 'health', name: 'Health', emoji: '💪', color: '#9b59b6' },
  { id: 'study', name: 'Study', emoji: '📚', color: '#f1c40f' }
];

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setShowAnimation(true);
    setDarkMode(!darkMode);
    setTimeout(() => setShowAnimation(false), 500);
  };

  const addTodo = (text, dueDate, time, category) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      time,
      category,
      createdAt: new Date()
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { 
          ...todo, 
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : null
        } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = selectedCategory === 'all' 
    ? todos 
    : todos.filter(todo => todo.category === selectedCategory);

  const getCategoryStats = () => {
    return CATEGORIES.map(category => ({
      ...category,
      count: todos.filter(todo => todo.category === category.id).length,
      completed: todos.filter(todo => 
        todo.category === category.id && todo.completed
      ).length
    }));
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''} ${showAnimation ? 'theme-transition' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="title-emoji">✨</span>
            React Todo List
            <span className="title-emoji">✨</span>
          </h1>
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

      <div className="categories-wrapper">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          🌈 All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            style={{ '--category-color': category.color }}
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>

      <div className="stats-container">
        {getCategoryStats().map(category => (
          <div 
            key={category.id} 
            className="category-stat"
            style={{ '--category-color': category.color }}
          >
            <span className="category-emoji">{category.emoji}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">
              {category.completed}/{category.count}
            </span>
          </div>
        ))}
      </div>

      <TodoForm onSubmit={addTodo} categories={CATEGORIES} />
      <TodoList 
        todos={filteredTodos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo}
        categories={CATEGORIES}
      />
    </div>
  );
}

export default App;
