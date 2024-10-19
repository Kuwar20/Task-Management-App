import { useState, useEffect } from 'react';
import Head from 'next/head';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-0 px-2">
      <Head>
        <title>Task Management App</title>
        <meta name="description" content="A simple task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-20 px-0 flex-1 flex flex-col justify-center items-center">
        <h1 className="m-0 text-6xl text-center mb-8">Task Management App</h1>
        <TaskForm onAddTask={addTask} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 text-base mb-4 border border-gray-300 rounded"
        />
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleComplete={toggleComplete}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // In a real application, you would fetch this data from an API or database
  const initialTasks = [
    { id: 1, title: 'Learn Next.js', description: 'Study Next.js fundamentals', priority: 'high', completed: false },
    { id: 2, title: 'Build a project', description: 'Create a task management app', priority: 'medium', completed: false },
    { id: 3, title: 'Exercise', description: 'Go for a 30-minute run', priority: 'low', completed: false },
  ];

  return {
    props: {
      initialTasks,
    },
  };
}