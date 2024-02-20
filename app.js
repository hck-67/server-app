const express = require("express");
const { User } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid email/password" });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email/password" });
  }

  const access_token = jwt.sign({ id: user.id, email: user.email }, "secret");

  res.status(200).json({ access_token });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
