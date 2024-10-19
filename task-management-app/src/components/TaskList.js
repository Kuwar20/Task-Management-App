import React, { useState } from 'react';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onToggleComplete }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = () => {
    onEditTask(editingTask.id, editingTask);
    setEditingTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <ul className="w-full">
      {tasks.map((task) => (
        <li key={task.id} className={`bg-white border ${getPriorityColor(task.priority)} border-l-4 mb-4 p-4 rounded-lg shadow ${task.completed ? 'opacity-60' : ''}`}>
          {editingTask && editingTask.id === task.id ? (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                name="title"
                value={editingTask.title}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="description"
                value={editingTask.description}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
              <select
                name="priority"
                value={editingTask.priority}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <span className="text-sm text-gray-500">{task.priority}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onToggleComplete(task.id)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEdit(task)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit</button>
                <button onClick={() => onDeleteTask(task.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;