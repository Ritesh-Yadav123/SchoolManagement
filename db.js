const mysql=require('mysql2');

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ritesh",
    database:"school"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("connected to database...........");
})

module.exports=db;
