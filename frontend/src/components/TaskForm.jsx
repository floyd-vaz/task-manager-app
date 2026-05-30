import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onAdd(form);
    setForm({ title: "", description: "", priority: "medium" });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Add New Task</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;