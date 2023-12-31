const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/", userController.createUser);

router.post("/login", userController.authenticateUser);

router.get("/", userController.getUsers);

router.get("/:userId", userController.getUserById);



module.exports = router;
