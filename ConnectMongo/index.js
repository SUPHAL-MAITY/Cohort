const express = require('express')
const mongoose=require('mongoose')


// suphal_practice
// YC1H3ToYVtDvtoa6

async function connectDB(){
  
  try{
    const connectData= await mongoose.connect('mongodb+srv://suphal_practice:YC1H3ToYVtDvtoa6@cluster0.9vfrosu.mongodb.net/Todo_app');
    console.log('connected to database');
    console.log("host:",connectData.connection.host)
    app.listen(3000,()=>{
      console.log("server started")
    })
    
  }catch(err){
    console.error(err)
  } 
}

connectDB();




const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


