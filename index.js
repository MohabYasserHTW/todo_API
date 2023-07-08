require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/todos", require("./routes/todos-route"));
app.use("/api/users", require("./routes/auth-route"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Couldn't find this route" });
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  } else {
    res.status(err.code);
    res.json({ message: err.message || "Unknown error occurred" });
  }
});

const { DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/`;
mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(5002, () => {
      console.log("Server working on port 5002");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to the database:", err);
  });
