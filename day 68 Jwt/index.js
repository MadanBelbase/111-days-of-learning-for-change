 const express = require("express");
 const app = express();

app.get("/", (req,res) =>{
    res.json({
        message: "Hello From the server"
    }

    )
})

app.post("/login" , (req,res)=>{
    res.json
})


 app.listen(4000,()=>{
    console.log("Server is runing on port 4000")
 })