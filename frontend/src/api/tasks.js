const BASE = 'https://task-manager-71b7.onrender.com';

export const fetchTasks = async (filter = 'all') => {
  const query = filter !== 'all' ? `?status=${filter}` : '';
  const res = await fetch(`${BASE}${query}`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const json = await res.json();
  return json.data;
};

export const createTask = async (title) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create task');
  return json.data;
};

export const toggleTask = async (id, completed) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to update task');
  return json.data;
};

export const editTask = async (id, title) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to edit task');
  return json.data;
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
};
const BASE = `${process.env.https://task-manager-71b7.onrender.com}/tasks`;