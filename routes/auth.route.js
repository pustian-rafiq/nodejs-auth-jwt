const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const User = require("../models/user.model");

router.post("/register", async (req, res, next) => {
  // res.send("Register route");
  console.log(req.body);

  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) throw createErrors.BadRequest();

    const isExistUser = await User.findOne({ email: email });
    if (isExistUser)
      throw createErrors.Conflict(`${email} is already been registered`);

    const user = new User({ username, email, password });
    const saveduser = await user.save();

    res.send(saveduser);
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  res.send("Login route");
});
router.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("Logout route");
});

module.exports = router;
