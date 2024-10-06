const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const getAllTodoList = async () => {
  try {
    const data = await readFileAsync("todos.json", "utf8");
    const parseData = await JSON.parse(data);
    return parseData;
  } catch (error) {
    console.error(error);
  }
};

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/getall", async function (req, res) {
  const allTodos = await getAllTodoList();
  console.log(allTodos);
  res.json(allTodos);
});

app.listen(3001, function () {
  console.log("port is listening at port 3001");
});
