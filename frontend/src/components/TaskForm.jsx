import { useState } from 'react';

export default function TaskForm({ onSubmit, initialData = {}, onCancel }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [status, setStatus] = useState(initialData.status || 'pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status });
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '2rem' }}>
            <h3>{initialData.id ? 'Edit Task' : 'New Task'}</h3>
            <input
                type="text"
                placeholder="Task Title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
            />
            <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                    {initialData.id ? 'Update Task' : 'Create Task'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn" style={{ backgroundColor: '#334155', color: 'white' }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
