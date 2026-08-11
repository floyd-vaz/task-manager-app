import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import API_URL from "../api";

const useAnimatedCounter = (target, duration = 700) => {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    const from = valueRef.current;
    const diff = target - from;
    if (diff === 0) return;

    let frame;
    let start = null;

    const tick = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + diff * eased);
      valueRef.current = next;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
};

const StatCard = ({ value, label, tone }) => {
  const animated = useAnimatedCounter(value);

  return (
    <div className="stat-card glass-panel">
      <p className={`stat-value ${tone}`}>{animated}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const VIEW_TITLES = {
  all: "All Tasks",
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

const DashboardPage = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, { headers });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (form) => {
    try {
      const res = await axios.post(`${API_URL}/api/tasks`, form, { headers });
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/api/tasks/${id}`, updates, { headers });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, { headers });
      setTasks((prev) => prev.filter((t) => t._id !== id));
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

  const visibleTasks =
    view === "all" ? tasks : tasks.filter((t) => t.status === view);

  return (
    <div className="dash-layout">
      <Sidebar
        activeView={view}
        onNavigate={setView}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dash-main">
        <div className="dash-header">
          <div className="dash-header-copy">
            <button
              type="button"
              className="sidebar-toggle"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <h1>{VIEW_TITLES[view]}</h1>
              <p>Hey {user?.name || "there"} — track and ship your work.</p>
            </div>
          </div>
        </div>

        <div className="stat-grid">
          <StatCard value={pending} label="Pending" tone="is-pending" />
          <StatCard value={inProgress} label="In Progress" tone="is-progress" />
          <StatCard value={completed} label="Completed" tone="is-done" />
        </div>

        <TaskForm onAdd={addTask} />

        {loading ? (
          <p className="dash-empty">Loading tasks...</p>
        ) : visibleTasks.length === 0 ? (
          <p className="dash-empty">
            {tasks.length === 0
              ? "No tasks yet. Add one above!"
              : "No tasks in this view."}
          </p>
        ) : (
          <div className="task-list">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
