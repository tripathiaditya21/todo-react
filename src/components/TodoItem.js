import React from 'react';
import { format } from 'date-fns';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-details">
          <span className="todo-text">{todo.text}</span>
          <div className="todo-meta">
            <span className="due-date">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
            {todo.time && (
              <span className="due-time">
                at {todo.time}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
