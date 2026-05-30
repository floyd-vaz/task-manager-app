const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-600",
  "in-progress": "bg-blue-100 text-blue-600",
  completed: "bg-green-100 text-green-700",
};

const TaskCard = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-500 text-sm">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mt-1">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="flex gap-2 mt-2">
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id, { status: e.target.value })}
          className="text-sm border border-gray-200 rounded px-2 py-1 flex-1"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={() => onDelete(task._id)}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;