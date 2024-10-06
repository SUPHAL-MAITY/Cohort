const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");



app.use(express.json());

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


const  fetchSingleUserTodos=async(id)=>{
     const allTodos= await getAllTodoList();
     console.log("allTodos",allTodos)
     
     const singleUserTodos=allTodos.filter((c)=>c.id==id)[0].todos
     console.log(singleUserTodos)
     return singleUserTodos;

    

}

app.get("/:id", function (req, res) {
  res.send("Hello World");
});

app.get("/getall", async function (req, res) {
  const allTodos = await getAllTodoList();
  console.log(allTodos);
  res.json(allTodos);
});

app.post("/add/:id",async function(req, res){
    const { id } = req.params;
    const  {desc} =req.body;
    

    const singleUserTodos= await fetchSingleUserTodos(id)
    // console.log("singleuserTodos:",singleUserTodos)

    const newTodo={
      id: Math.floor(Math.random() * Date.now()),
      desc,
      completed:false

    }
    // console.log(newTodo)
    singleUserTodos.push(newTodo)
    // console.log(singleUserTodos)

    const allTodos= await getAllTodoList();
    
    
    allTodos.filter((c)=>c.id==id)[0].todos=singleUserTodos

    

    const stringAllTodos=JSON.stringify(allTodos,null,2)

    writeTodoList(stringAllTodos)

    res.status(201).json({ message: "Todo added successfully", todos: singleUserTodos })
    

})

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
