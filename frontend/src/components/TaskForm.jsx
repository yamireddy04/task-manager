import React, { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ onAdd, loading }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) { setError('Task title cannot be empty.'); return; }
    setError('');
    await onAdd(value);
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="new task..."
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(''); }}
          disabled={loading}
          maxLength={200}
        />
        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? '...' : '+ Add'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}