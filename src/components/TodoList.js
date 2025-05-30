import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, categories }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">No tasks yet! Add a task to get started.</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            categories={categories}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
