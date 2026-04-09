import React, { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(task.title);
  const [busy, setBusy] = useState(false);

  const handleEdit = async () => {
    if (!editVal.trim() || editVal.trim() === task.title) { setEditing(false); return; }
    setBusy(true);
    await onEdit(task.id, editVal.trim());
    setBusy(false);
    setEditing(false);
  };

  const handleToggle = async () => {
    setBusy(true);
    await onToggle(task.id, !task.completed);
    setBusy(false);
  };

  const handleDelete = async () => {
    setBusy(true);
    await onDelete(task.id);
  };

  const date = new Date(task.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className={`${styles.item} ${task.completed ? styles.done : ''} ${busy ? styles.busy : ''}`}>
      <button
        className={`${styles.check} ${task.completed ? styles.checked : ''}`}
        onClick={handleToggle}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        disabled={busy}
      >
        {task.completed ? '✓' : ''}
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            className={styles.editInput}
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') setEditing(false); }}
            autoFocus
            disabled={busy}
            maxLength={200}
          />
        ) : (
          <span className={styles.title}>{task.title}</span>
        )}
        <span className={styles.date}>{date}</span>
      </div>

      <div className={styles.actions}>
        {editing ? (
          <>
            <button className={styles.save} onClick={handleEdit} disabled={busy}>Save</button>
            <button className={styles.cancel} onClick={() => { setEditing(false); setEditVal(task.title); }} disabled={busy}>✕</button>
          </>
        ) : (
          <>
            <button className={styles.edit} onClick={() => setEditing(true)} disabled={busy} title="Edit">✎</button>
            <button className={styles.delete} onClick={handleDelete} disabled={busy} title="Delete">⌫</button>
          </>
        )}
      </div>
    </div>
  );
}