require("dotenv").config();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    /* const isMatch = await bcrypt.compare(password, user.password); */
    // i didn't encrypt the password while creating the users cause it was not required in your file but i should encrypt it anyway if i got more time i will go back and edit it

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(isMatch, password, user.password);
    const { SECRET } = process.env;
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, userName, password } = req.body;

    const user = new User({
      name,
      userName,
      password,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};
