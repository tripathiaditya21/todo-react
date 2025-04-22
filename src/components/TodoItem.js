import React, { useState } from 'react';
import { format } from 'date-fns';

const DEFAULT_CATEGORY = {
  id: 'default',
  name: 'Task',
  emoji: '📝',
  color: '#95a5a6'
};

function TodoItem({ todo, onToggle, onDelete, categories = [] }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const category = categories.find(c => c.id === todo.category) || DEFAULT_CATEGORY;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
         style={{ '--category-color': category.color }}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-details">
          <div className="todo-header">
            <span className="todo-text">{todo.text}</span>
            <span className="category-badge">
              <span className="category-emoji">{category.emoji}</span>
              {category.name}
            </span>
          </div>
          <div className="todo-meta">
            <span className="due-date">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
            {todo.time && (
              <span className="due-time">
                at {todo.time}
              </span>
            )}
            {todo.completed && todo.completedAt && (
              <span className="completed-at">
                ✅ Completed {format(new Date(todo.completedAt), 'MMM d, h:mm a')}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={handleDelete}
          className="delete-button"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
