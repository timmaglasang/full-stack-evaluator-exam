import { useEffect, useState } from 'react';
import api from "../src/api/axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newStatus, setNewStatus] = useState(false);

    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTask = async () => {
        const newTask = { title: newTitle, isDone: newStatus };
        try {
            const res = await api.post('/tasks', newTask);
            setTasks(prev => [...prev, res.data]);
            setShowModal(false);
            setNewTitle("");
            setNewStatus(false);
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const updateTask = async (id) => {
        try {
            const updatedTask = { title: "Updated Task", isDone: true };
            const res = await api.put(`/tasks/${id}`, updatedTask);
            setTasks(prev => prev.map(task => task.id === id ? res.data : task));
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw"
            }}
        >
            <h2 style={{ marginBottom: "10px" }}>Tasks</h2>
            <button
                onClick={() => setShowModal(true)}
                style={{
                    marginBottom: "15px",
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                ➕ Add Task
            </button>

            <table
                style={{
                    borderCollapse: "collapse",
                    width: "70%",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} style={{ backgroundColor: task.isDone ? "#e6ffe6" : "#ffe6e6" }}>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{task.id}</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{task.title}</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                {task.isDone ? "✅ Done" : "❌ Pending"}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                <button
                                    onClick={() => updateTask(task.id)}
                                    style={{
                                        marginRight: "8px",
                                        padding: "6px 12px",
                                        backgroundColor: "#FFD700", // yellow
                                        color: "black",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    style={{
                                        padding: "6px 12px",
                                        backgroundColor: "#f44336", // red
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "300px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                        }}
                    >
                        <h3>Add New Task</h3>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        />
                        <label style={{ display: "block", marginBottom: "10px" }}>
                            <input
                                type="checkbox"
                                checked={newStatus}
                                onChange={(e) => setNewStatus(e.target.checked)}
                            />{" "}
                            Mark as Done
                        </label>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                onClick={addTask}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;
