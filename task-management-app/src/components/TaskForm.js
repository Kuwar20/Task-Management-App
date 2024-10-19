import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ title: '', description: '', priority: 'medium' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() && task.description.trim()) {
      onAddTask(task);
      setTask({ title: '', description: '', priority: 'medium' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 sm:w-1/2 mb-8">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task description"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;    