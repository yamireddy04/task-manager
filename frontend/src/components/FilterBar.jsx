import React from 'react';
import styles from './FilterBar.module.css';

const FILTERS = ['all', 'incomplete', 'completed'];

export default function FilterBar({ active, onChange }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`${styles.btn} ${active === f ? styles.active : ''}`}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}