import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

function TodoForm({ onSubmit }) {
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input, selectedDate, selectedTime);
    setInput('');
    setSelectedTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
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
        <button type="submit" className="todo-button">Add Task</button>
      </div>
    </form>
  );
}

export default TodoForm;
