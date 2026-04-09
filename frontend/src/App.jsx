import React, { useState, useEffect, useCallback } from 'react';
import * as api from './api/tasks';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.fetchTasks(filter);
      setTasks(data);
    } catch (e) {
      setError('Could not load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async (title) => {
    setAdding(true);
    try {
      const task = await api.createTask(title);
      if (filter === 'completed') { /* don't add to list */ }
      else setTasks((prev) => [task, ...prev]);
    } catch (e) {
      setError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const updated = await api.toggleTask(id, completed);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      // refetch for filter accuracy
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) { setError(e.message); }
  };

  const handleEdit = async (id, title) => {
    try {
      const updated = await api.editTask(id, title);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) { setError(e.message); }
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>tasks.</h1>
          <p className={styles.subtitle}>
            {total === 0 ? 'no tasks yet' : `${done} / ${total} done`}
          </p>
        </header>

        <TaskForm onAdd={handleAdd} loading={adding} />

        <div className={styles.toolbar}>
          <FilterBar active={filter} onChange={setFilter} />
        </div>

        {error && (
          <div className={styles.errorBanner}>
            ⚠ {error}
            <button onClick={() => setError('')} className={styles.dismiss}>✕</button>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>loading tasks…</div>
        ) : tasks.length === 0 ? (
          <div className={styles.empty}>
            {filter === 'all' ? 'add your first task above ↑' : `no ${filter} tasks`}
          </div>
        ) : (
          <ul className={styles.list}>
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}