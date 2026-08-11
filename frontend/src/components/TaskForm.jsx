import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd(form);
    setForm({ title: "", description: "", priority: "medium" });
  };

  return (
    <form className="task-form glass-panel" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <div className="task-form-row">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          className="glowing-input"
          required
        />

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="glowing-input"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="glowing-input"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <div className="task-form-actions">
        <button type="submit" className="futuristic-button">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
