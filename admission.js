const express=require('express');
const path=require('path');
const db=require('./db');
const router=express.Router();

const pathname=path.join(__dirname,"public");
// router.use(express.static(pathname));

router.get("/",(req,res)=>{
    res.sendFile(path.join(pathname,"admission.html"));
})


module.exports=router;