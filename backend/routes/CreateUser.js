const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const jwtSecret = "secret";

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
        location: req.body.location,
      }).then((user) => res.json(user));
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res
        .status(400)
        .json({ errors: "Try logging in with correct credentials" });
    }
    console.log(userData);

    if (!bcrypt.compareSync(req.body.password, userData.password)) {
      return res
        .status(400)
        .json({ errors: "Try logging in with correct credentials" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);

    return res.json({ success: true, authToken: authToken, email: email });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
