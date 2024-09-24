import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUserByEmail,
} from "../databases/userQueries.js";
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

router.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User was not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = {
      email,
      password,
    };

    const user = await createUser(newUser);
    res.json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
});

router.delete("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const deletedCount = await deleteUser(email);
    if (deletedCount === 0) {
      return res.status(404).json({ message: "User was not found." });
    }

    res.json({ message: "User has been deleted deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

export default router;
