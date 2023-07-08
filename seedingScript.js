require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("./models/todo-model");
const todos = require("./todosSeed");

const { DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/`;
console.log(dbURL);
mongoose.connect(dbURL);

async function seedDatabase() {
  try {
    await Todo.deleteMany();

    for (const todo of todos) {
      const newTodo = new Todo({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      });
      await newTodo.save();
    }

    console.log("Database seeding completed");
    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
}

seedDatabase();
