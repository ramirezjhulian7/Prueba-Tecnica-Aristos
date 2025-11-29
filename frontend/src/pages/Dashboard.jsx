import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const { user, logout } = useAuth();

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3002/tasks', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [user]);

    const handleCreateTask = async (taskData) => {
        try {
            const response = await fetch('http://localhost:3002/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(taskData)
            });
            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const response = await fetch(`http://localhost:3002/tasks/${editingTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(taskData)
            });
            if (response.ok) {
                setEditingTask(null);
                fetchTasks();
            }
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            const response = await fetch(`http://localhost:3002/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    return (
        <div>
            <nav className="nav">
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Task Manager</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Hello, {user.username}</span>
                    <button onClick={logout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container">
                {editingTask ? (
                    <TaskForm
                        initialData={editingTask}
                        onSubmit={handleUpdateTask}
                        onCancel={() => setEditingTask(null)}
                    />
                ) : (
                    <TaskForm onSubmit={handleCreateTask} />
                )}

                <div className="task-list">
                    {tasks.map(task => (
                        <div key={task.id} className="task-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0 }}>{task.title}</h3>
                                <span className={`status-badge status-${task.status}`}>
                                    {task.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{task.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setEditingTask(task)}
                                    className="btn"
                                    style={{ backgroundColor: '#334155', color: 'white', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="btn btn-danger"
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
