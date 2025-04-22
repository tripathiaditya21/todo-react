import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

function TodoForm({ onSubmit, categories }) {
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.id || 'work');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input, selectedDate, selectedTime, selectedCategory);
    setInput('');
    setSelectedTime('');
    setIsExpanded(false);
  };

  if (!categories) return null;

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-main">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="todo-input"
            onFocus={() => setIsExpanded(true)}
          />
          <button 
            type="button" 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
        <button type="submit" className="todo-button">
          Add Task
        </button>
      </div>
      
      <div className={`form-details ${isExpanded ? 'expanded' : ''}`}>
        <div className="categories-select">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`category-option ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <span className="category-emoji">{category.emoji}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
        <div className="datetime-select">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="date-picker"
            placeholderText="Select due date"
          />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="time-picker"
          />
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
