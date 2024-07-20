const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register new User

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let extuser = User.findOne({ email: email });
    if (!extuser) {
      res.status(400).json("User Already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const result = await User.create({
        email: email,
        name: name,
        password: hash,
      });
      console.log(result.id);
      const payload = { user: { id: result.id, name: result.name } };
      jwt.sign(payload, "event-management-2005", (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Login User

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json("Invalid Credentials");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json("Invalid Credentials");
      }
      const payload = {  id: user.id, name: user.name  };
      jwt.sign(payload, "event-management-2005", (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
