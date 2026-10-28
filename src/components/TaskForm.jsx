
import { useState, useEffect } from "react";

function TaskForm({
  onAddTask,
  editingTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a task name.");
      return;
    }

    onAddTask(title.trim(), priority, dueDate);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <input
        type="text"
        placeholder="Enter task name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

      {editingTask && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;

