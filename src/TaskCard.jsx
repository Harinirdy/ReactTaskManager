
import { useState } from "react";

function TaskCard({ title, priority }) {
  const [completed, setCompleted] = useState(false);

  function handleComplete() {
  setCompleted(!completed);
}
  return (
    <div>
      <h3>{title}</h3>
      <p>Priority: {priority}</p>

      <p>Status: {completed ? "Completed" : "Pending"}</p>

      <button onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
}

export default TaskCard;
