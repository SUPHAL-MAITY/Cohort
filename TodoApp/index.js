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



const  writeTodoList=async(todos)=>{
    await writeFileAsync("todos.json",todos)
    return ;


}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/getall", async function (req, res) {
  const allTodos = await getAllTodoList();
  console.log(allTodos);
  res.json(allTodos);
});

app.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;
  const allTodos = await getAllTodoList();
  const updatedTodoList = allTodos.filter((c) => c.id != id);
  console.log(updatedTodoList);
  const  stringTodoList=JSON.stringify(updatedTodoList,null,2)
  await writeTodoList(stringTodoList)
  res.json(updatedTodoList);
});

app.listen(3000, function () {
  console.log("port is listening at port 3000");
});

