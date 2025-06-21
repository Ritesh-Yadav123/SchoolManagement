const express = require("express");
const path = require("path");
const db = require("./db");
const router=express.Router();

router.use(express.json());

router.get("/",(req,res)=>{
    const studentData = {
        class: req.query.class,
        section: req.query.section
    };
    res.render("work.ejs", {studentData});
})


module.exports=router;