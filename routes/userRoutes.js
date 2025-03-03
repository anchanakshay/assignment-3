const express = require("express");
const User = require("../models/User");
const logger = require("../logger");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    logger.info(`User creation success: ${user}`);
    res.status(201).send(user);
  } catch (error) {
    logger.error(`Failed to create user: ${error.message}`);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    logger.info("Fetched all users successfully");
    res.status(200).send(users);
  } catch (error) {
    logger.error(`something went wrong while fetching users: ${error.message}`);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      logger.warn(`Could not find user with id: ${req.params.id}`);
      return res.status(404).send();
    }
    logger.info(`User updated: ${user}`);
    res.status(200).send(user);
  } catch (error) {
    logger.error(`Something went wrong while updating user: ${error.message}`);
    res.status(400).send(error);
  }
});

module.exports = router;
