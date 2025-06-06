const express=require('express');
const app=express();
const path = require("path");
const db = require("./db");

const pathname=path.join(__dirname, "Public");
app.use(express.static(pathname));

app.get('/',(req,res)=>{
    res.sendFile(index.html);
})

app.listen(5000);