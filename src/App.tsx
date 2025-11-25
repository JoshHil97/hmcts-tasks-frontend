import { useState } from "react";
import axios from "axios";

type TaskStatus = "todo" | "in_progress" | "done";

interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  due_datetime: string;
  created_at: string;
}

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [dueDatetime, setDueDatetime] = useState("");
  const [createdTask, setCreatedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setCreatedTask(null);

    try {
      const payload = {
        title,
        description: description || null,
        status,
        due_datetime: new Date(dueDatetime).toISOString(),
      };

      const response = await axios.post<Task>(`${API_BASE}/tasks`, payload);
      setCreatedTask(response.data);

      // reset form
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDatetime("");
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(JSON.stringify(err.response.data.detail, null, 2));
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1f2933 0, #0b1015 55%, #020308 100%)",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "1rem",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(15, 23, 42, 0.98)",
          borderRadius: "0.75rem",
          padding: "2rem 2.25rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
        }}
      >
        <header style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            HMCTS Task Creator
          </h1>
          <p
            style={{
              marginTop: "0.5rem",
              color: "#cbd5f5",
              fontSize: "0.95rem",
            }}
          >
            Create a new task and send it to your FastAPI backend.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}
        >
          <div>
            <label
              htmlFor="title"
              style={{ display: "block", marginBottom: "0.25rem" }}
            >
              Title <span style={{ color: "#f97373" }}>*</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #4b5563",
                backgroundColor: "#020617",
                color: "#f9fafb",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              style={{ display: "block", marginBottom: "0.25rem" }}
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #4b5563",
                backgroundColor: "#020617",
                color: "#f9fafb",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              style={{ display: "block", marginBottom: "0.25rem" }}
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #4b5563",
                backgroundColor: "#020617",
                color: "#f9fafb",
                outline: "none",
              }}
            >
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="due"
              style={{ display: "block", marginBottom: "0.25rem" }}
            >
              Due date &amp; time
            </label>
            <input
              id="due"
              type="datetime-local"
              value={dueDatetime}
              onChange={(e) => setDueDatetime(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #4b5563",
                backgroundColor: "#020617",
                color: "#f9fafb",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(to right, #22c55e, #16a34a, #15803d)",
              color: "#020617",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isSubmitting ? "default" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              transition: "transform 0.08s ease, box-shadow 0.08s ease",
              boxShadow: "0 8px 20px rgba(22, 163, 74, 0.45)",
            }}
          >
            {isSubmitting ? "Creating…" : "Create task"}
          </button>
        </form>

        {error && (
          <section
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(185, 28, 28, 0.15)",
              border: "1px solid rgba(248, 113, 113, 0.4)",
              color: "#fecaca",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>There was a problem</strong>
            <pre
              style={{
                marginTop: "0.5rem",
                fontSize: "0.8rem",
                overflowX: "auto",
              }}
            >
              {error}
            </pre>
          </section>
        )}

        {createdTask && (
          <section
            style={{
              marginTop: "0.75rem",
              padding: "0.9rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(22, 163, 74, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.5)",
              color: "#bbf7d0",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ marginBottom: "0.35rem", fontWeight: 600 }}>
              Task created successfully ✅
            </div>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              <li>
                <strong>ID:</strong> {createdTask.id}
              </li>
              <li>
                <strong>Title:</strong> {createdTask.title}
              </li>
              {createdTask.description && (
                <li>
                  <strong>Description:</strong> {createdTask.description}
                </li>
              )}
              <li>
                <strong>Status:</strong> {createdTask.status}
              </li>
              <li>
                <strong>Due:</strong>{" "}
                {new Date(createdTask.due_datetime).toLocaleString()}
              </li>
              <li>
                <strong>Created:</strong>{" "}
                {new Date(createdTask.created_at).toLocaleString()}
              </li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
