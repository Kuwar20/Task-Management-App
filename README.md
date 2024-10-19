# Task Management App

## [Live Demo](https://task-management-app-nusj.vercel.app/)

## Overview
The Task Management App is a simple web application built with React and Next.js. It allows users to manage their tasks efficiently, offering functionalities to add, edit, delete, and mark tasks as completed. The app also supports dynamic sorting of tasks by priority and features server-side rendering for initial task loading.

## Features
- **Task Management**: Add, edit, delete, and toggle tasks between completed and pending states.
- **Dynamic Sorting**: Sort tasks by priority (high, medium, low) with high priority tasks displayed at the top.
- **Search Functionality**: Filter tasks based on their title or description.
- **Server-Side Rendering**: Initial tasks are loaded server-side using Next.js `getServerSideProps`.
- **Responsive Design**: Basic HTML/CSS styling ensures the app is mobile-friendly.
- **Local Storage**: Persist tasks between page reloads.

# Sorting Implementation in Task Management App

## Overview
This document details the sorting functionality implemented in the **Task Management App**, which organizes tasks by both their **completion status** and **priority**.

### Features of Sorting:
1. **Completion-Based Sorting**: 
   - Incomplete tasks are displayed at the top.
   - Completed tasks are moved to the bottom of the list.

2. **Priority-Based Sorting**:
   - Among the incomplete tasks, they are further sorted by priority: 
     - `high` (highest priority)
     - `medium`
     - `low` (lowest priority)

This ensures that the most important, incomplete tasks are displayed first.

### Sorting Code Breakdown
The sorting logic is located in the `index.js` file and is implemented using JavaScript's array `sort` method. Below is the key section of the sorting implementation:

```javascript
const sortedTasks = [...tasks].sort((a, b) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  // Sort by completion status: Incomplete tasks first, completed tasks at the bottom
  if (a.completed !== b.completed) {
    return a.completed ? 1 : -1;
  }

  // Sort by priority: High -> Medium -> Low
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});


## Technologies Used
- **Frontend**: React, Next.js
- **Styling**: TailwindCSS for responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Kuwar20/Task-Management-App.git
   cd task-management-app

2. Install dependencies:

   ```bash
   npm install

3. Run the development server:

   ```bash
   npm run dev

4. Open your browser and navigate to http://localhost:3000 to see the app in action.

