import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const DashboardPage = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", { headers });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (form) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", form, { headers });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updates, { headers });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pending = tasks.filter((t) => t.status === "pending").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-700">{pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{inProgress}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>

        {/* Add Task Form */}
        <TaskForm onAdd={addTask} />

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No tasks yet. Add one above!</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;