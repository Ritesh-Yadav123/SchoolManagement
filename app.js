const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("I LOVE YOU MERI JAN");
})

app.listen(5000);