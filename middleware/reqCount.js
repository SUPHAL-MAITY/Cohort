const express = require('express');

const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable
let reqCount=0;

const requestCount=(req,res,next)=>{
    reqCount++;
    console.log(reqCount)
    next()

}

app.use(requestCount)



app.get("/",function(req,res){
    console.log("/ url hit")
    res.status(200).json({status:200,message:"successfully /  page obtained"})
    
})

app.get("/v1",function(req,res){
    console.log("/v1 url hit")
    res.status(200).json({status:200,message:"successfully v1  page obtained"})
    
})

app.get("/v2",function(req,res){
    console.log("/v2 url hit")
    res.status(200).json({status:200,message:"successfully v2 page obtained"})
    
})


app.listen(3000,()=>{
    console.log("port is listening at 3000")
})
