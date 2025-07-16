const express = require('express');
const path = require('path');
const fs=require('fs');
const router = express.Router();

const pathname=path.join(__dirname,"Public");

router.get("/",(req,res)=>{
    res.sendFile(path.join(pathname,"notice.html"));
})

module.exports=router;