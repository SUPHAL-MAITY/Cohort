const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));

// fs always takes string and return string

// 1. GET /files - Returns a list of files present in `./files/` directory
//     Response: 200 OK with an array of file names in JSON format.
   
app.get("/files",async function (req,res){
    fs.readdir("./files",(err,files)=>{
        if(err){
            console.log(err)
        }else{
            let filesArray=[]
            files.forEach((file,i)=>{
                console.log(file)
                const newFile={
                    id:i+1,
                    name:file
                }
                filesArray.push(newFile)
            })
            fs.writeFile("files.txt",JSON.stringify(filesArray,null,2),(err)=>{
                console.log(err)
            })
            res.status(200).json({"status":200,"message":"File names has been added to a new file",filesArray})
        }
    })
})


// GET /file/:filename - Returns content of given file by name
//      Description: Use the filename from the request path parameter to read the file from `./files/` directory
//      Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     

app.get("/file/:filename",async function(req,res){
    console.log("file name hit")
    const {filename}=req.params;
    console.log(filename)

    fs.readFile(`./files/${filename}`,"utf8",(err,data)=>{
        if(err){
            if(err.code=="ENOENT"){
                res.status(404).json({status:404,message:"File directory not found"})
            }else{
                console.log(err)
            }

        }else{
            res.status(200).json({status:200,message:"File found successfully",data})

        }
       
    })

})

app.listen(3000, function () {
    console.log("port is listening at port 3000");
  });
