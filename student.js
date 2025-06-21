const express = require("express");
const path = require("path");
const db = require("./db");
const router=express.Router();

router.use(express.json());

const pathname = path.join(__dirname, "public");
// router.use(express.static(pathname));

router.get("/",(req,res)=>{
    res.send("I am from student.js");
})


module.exports=router;