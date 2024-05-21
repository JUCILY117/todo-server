const express = require('express');
const Todo = require('./todoSchema');

const router = express.Router();

// Create a new todo
router.post('/todos', async (req, res) => {
  const { text, categories, userId } = req.body;
  try {
    const newTodo = new Todo({
      text,
      categories: categories.slice(0, 3),
      user: userId,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all todos
router.get('/todos', async (req, res) => {
  const userId = req.query.userId;
  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a todo
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed, categories } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.text = text ?? todo.text;
    todo.completed = completed ?? todo.completed;
    todo.categories = categories ? categories.slice(0, 3) : todo.categories;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
