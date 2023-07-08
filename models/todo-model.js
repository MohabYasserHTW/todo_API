const mongoose = require("mongoose");

const Schemaa = mongoose.Schema;

const todoSchema = new Schemaa({
  title: {
    type: String,
    required: true,
    default: " ",
  },
  description: {
    type: String,
    required: true,
    default: " ",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
