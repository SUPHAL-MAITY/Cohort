const express = require('express');

const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

///////////solution//////////////

// 1. initialize  an empty object  >>>>>  numberOfRequest={ id:1}
// 2.after every 5 seconds  reInitialize it 
// 3.write rate limitter middleware 
//     a.take the user id from headers 
//     b.if its id already present in obj as key
//               1.if the count is more than 4  >>send 404 
//               2.if not increase the value and next
//     c. initialize  by 1  and next

///////////////////////////////////////////
          

let numberOfRequest={}


////after every 2 second it will initiate empty object
setInterval(()=>{
    numberOfRequest={}

},8000)

const rateLimitter=(req,res,next)=>{
    const userId=req.headers["user-id"]
    console.log(userId)

    if(userId in numberOfRequest){
                if(numberOfRequest[userId]>4){
                    console.log(numberOfRequest)
                    res.status(404).json({status:404,message:"you have crossed 5 request per 2 seconds"})

                    

                }else{
                    console.log(numberOfRequest)
                    numberOfRequest[userId]++;
                    next()
                   
                }
       
    }else{
        console.log(numberOfRequest)
        numberOfRequest[userId]=1;
        next()
    }



    
}



app.use(rateLimitter)



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
