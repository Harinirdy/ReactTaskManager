

import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  allTasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  if (tasks.length === 0) {
    return <p>No tasks match your search or filters.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => {
        const index = allTasks.indexOf(task);

        return (
          <li key={index}>
            <TaskCard
              title={task.title}
              priority={task.priority}
              dueDate={task.dueDate}
              completed={task.completed}
              onToggle={() => onToggleTask(index)}
              onEdit={() => onEditTask(index)}
              onDelete={() => onDeleteTask(index)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;

