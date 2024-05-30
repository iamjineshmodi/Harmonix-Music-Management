import pool from "./db";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken')
const handler = async(req,res)=>{
    if(req.method=='POST'){
        const {userID,username,age,email,password } = req.body;
        const u = await pool.query(
        "INSERT INTO users (userID,username,age,email,password) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [userID,username,age,email,password]
        );
        res.status(200).json({success:'success'})
    }else if(req.method=='PUT'){
        const {userID,age,email} = req.body
        const u = await pool.query(
            "UPDATE users SET age=$1,email=$2 WHERE userID=$3",[age,email,userID]
        );
        res.status(200).json({success:"success"})
    }
    else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler