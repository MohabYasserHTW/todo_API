const Todo = require("../models/todo-model");
const User = require("../models/user-model");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todo = new Todo({
      title,
      description,
      user: userId,
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.getTodosByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todos = await Todo.find({ user: userId });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todo" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description, completed } = req.body;

    console.log(title, description, completed, todoId);

    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.deleteOne();

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
