const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const Todo = require("./models/todo.model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/auth.middleware.js");
let secret = "bxu9en@3sinjo";

// suphal_practice
// YC1H3ToYVtDvtoa6

////connection with mongoDB
async function connectDB() {
  try {
    const connectData = await mongoose.connect(
      "mongodb+srv://suphal_practice:YC1H3ToYVtDvtoa6@cluster0.9vfrosu.mongodb.net/Todo_app",
    );
    console.log("connected to database");
    console.log("host:", connectData.connection.host);
    app.listen(3000, () => {
      console.log("server started");
    });
  } catch (err) {
    console.error(err);
  }
}



connectDB();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "name ,email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ status: 400, message: "user with thi email already exists" });
  }

  // const hashPassword=await  bcrypt.hash(password,10)
  // const user=await User.create({name,email,password:hashPassword})

  const user = await User.create({ name, email, password });

  if (!user) {
    return res
      .status(200)
      .json({ status: 400, message: "user with thi email already exists" });
  }

  return res
    .status(200)
    .json({ status: 400, user, message: "user created successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "email and password are required for login",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: 400,
      message: "email and password are required for login",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      status: 400,
      message: "password is wrong while trying to login",
    });
  }

  ////generating jwt token

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    secret,
    { expiresIn: "1h" },
  );

  if (!token) {
    return res
      .status(400)
      .json({ status: 400, message: "token has not been generated" });
  }

  return res
    .status(200)
    .json({ status: 200, user, token, message: "user created successfully" });
});

app.get("/auth",checkAuth , function (req, res) {
  console.log("email:",req.email)
  res.send("Auth accessed");
});


app.get("/", function (req, res) {
  
  res.send("Hello World");
});
