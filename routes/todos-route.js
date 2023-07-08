const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo-controller");

router.post("/", todoController.createTodo);

router.get("/user/:userId", todoController.getTodosByUser);

router.get("/:todoId", todoController.getTodoById);

router.put("/:todoId", todoController.updateTodo);

router.delete("/:todoId", todoController.deleteTodo);

module.exports = router;
