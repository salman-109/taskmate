// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Complete CV website', completed: false },
  { id: 2, title: 'Push TaskMate to GitHub', completed: true },
];

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else res.status(404).send('Not found');
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).end();
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
