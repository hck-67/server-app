const express = require("express");
const { User } = require("./models");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  res.status(201).json({
    id: user.id,
    email: user.email,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
