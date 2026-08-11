const TaskCard = ({ task, onDelete, onUpdate }) => {
  return (
    <article className="task-card glass-panel">
      <div className="task-card-top">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`task-badge priority-${task.priority}`}>{task.priority}</span>
      </div>

      {task.description && <p className="task-card-desc">{task.description}</p>}

      <div className="task-card-meta">
        <span className={`task-badge status-${task.status}`}>{task.status}</span>
      </div>

      <div className="task-card-actions">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
          className="glowing-input"
          aria-label="Update task status"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="button" onClick={() => onDelete(task._id)} className="task-delete">
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
