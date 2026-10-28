import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
function App() {

const [editingIndex, setEditingIndex] = useState(null);
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
 localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
const [searchText, setSearchText] = useState("");

const [priorityFilter, setPriorityFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [sortOrder, setSortOrder] = useState("default");

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const pendingTasks = totalTasks - completedTasks;
const progress =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchText.trim().toLowerCase());

  const matchesPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter;

  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Pending" && !task.completed) ||
    (statusFilter === "Completed" && task.completed);

  return matchesSearch && matchesPriority && matchesStatus;
});
  

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortOrder === "priority") {
    const priorityValues = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return priorityValues[b.priority] - priorityValues[a.priority];
  }

  if (sortOrder === "date") {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  }

  return 0;
});

function handleEditTask(index) {
  setEditingIndex(index);
}
   

function handleTaskFormSubmit(title, priority, dueDate) {
  if (title.trim() === "") {
    alert("Please enter a task name.");
    return;
  }

  const duplicateTask = tasks.some(
    (task, index) =>
      task.title.trim().toLowerCase() ===
        title.trim().toLowerCase() &&
      index !== editingIndex
  );

  if (duplicateTask) {
    alert("This task already exists!");
    return;
  }

  if (editingIndex !== null) {
    setTasks((previousTasks) =>
      previousTasks.map((task, index) =>
        index === editingIndex
          ? { ...task, title, priority, dueDate }
          : task
      )
    );

    setEditingIndex(null);
  } else {
    setTasks((previousTasks) => [
      ...previousTasks,
      { title, priority, dueDate, completed: false },
    ]);
  }
}
 function handleDeleteTask(indexToDelete) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) {
    return;
  }

  setTasks(
    tasks.filter((task, index) => index !== indexToDelete)
  );
}


  function handleToggleTask(indexToToggle) {
    setTasks(
      tasks.map((task, index) =>
        index === indexToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div>
      <h1>My Task Manager</h1>
      <div>
  <input
  type="text"
  placeholder="Search tasks..."
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}
/>


<select
  value={priorityFilter}
  onChange={(event) => setPriorityFilter(event.target.value)}
>
  <option value="All">All Priorities</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

<select
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value)}
>
  <option value="All">All Statuses</option>
  <option value="Pending">Pending</option>
  <option value="Completed">Completed</option>
</select>

<select
  value={sortOrder}
  onChange={(event) => setSortOrder(event.target.value)}
>
  <option value="default">Default Order</option>
  <option value="priority">High to Low Priority</option>
  <option value="date">Due Date</option>
</select>




<p>Total Tasks: {totalTasks}</p>
<p>Completed Tasks: {completedTasks}</p>
<p>Pending Tasks: {pendingTasks}</p>

<div className="progress-section">
  <div className="progress-label">
    <span>Task Completion Progress</span>
    <strong>{progress}%</strong>
  </div>

  <div className="progress-track">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>

<TaskForm
  onAddTask={handleTaskFormSubmit}
  editingTask={
    editingIndex !== null ? tasks[editingIndex] : null
  }
  onCancelEdit={() => setEditingIndex(null)}
/>

<TaskList
  tasks={sortedTasks}
  allTasks={tasks}
  onToggleTask={handleToggleTask}
  onEditTask={handleEditTask}
  onDeleteTask={handleDeleteTask}
/>

    </div>
    </div>
  );
}

export default App;
