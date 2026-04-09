const express = require('express');
const router = express.Router();
const taskStore = require('../store/taskStore');

// GET /tasks - return all tasks
router.get('/', (req, res) => {
  const { status } = req.query;
  let tasks = taskStore.getAll();

  if (status === 'completed') tasks = tasks.filter((t) => t.completed);
  else if (status === 'incomplete') tasks = tasks.filter((t) => !t.completed);

  res.json({ success: true, data: tasks });
});

// POST /tasks - create a new task
router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, message: 'Title is required and must be a non-empty string.' });
  }

  const task = taskStore.create(title);
  res.status(201).json({ success: true, data: task });
});

// PATCH /tasks/:id - update task (completed status or title)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;

  const existing = taskStore.getById(id);
  if (!existing) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  const updates = {};

  if (typeof completed === 'boolean') updates.completed = completed;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title must be a non-empty string.' });
    }
    updates.title = title.trim();
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ success: false, message: 'No valid fields to update.' });
  }

  const updated = taskStore.update(id, updates);
  res.json({ success: true, data: updated });
});

// DELETE /tasks/:id - delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = taskStore.remove(id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  res.json({ success: true, message: 'Task deleted.' });
});

module.exports = router;