
// import { useState } from "react";

// function TaskCard({ title, priority }) {
//   const [completed, setCompleted] = useState(false);

//   function handleComplete() {
//   setCompleted(!completed);
// }
//   return (
//     <div>
//       <h3>{title}</h3>
//       <p>Priority: {priority}</p>

//       <p>Status: {completed ? "Completed" : "Pending"}</p>

//       <button onClick={handleComplete}>
//         Complete
//       </button>
//     </div>
//   );
// }

// export default TaskCard;


import "../App.css";

function TaskCard({
  title,
  priority,
  dueDate,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>Priority: {priority}</p>
      <p>Due Date: {dueDate || "Not set"}</p>
      <p>Status: {completed ? "Completed" : "Pending"}</p>

      <button onClick={onToggle}>
        {completed ? "Mark as Pending" : "Mark as Completed"}
      </button>

      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default TaskCard;

