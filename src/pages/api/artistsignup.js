import pool from "./db";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken')
const handler = async(req,res)=>{
    if(req.method=='POST'){
        const {artistID,name,age,email,password,followers,biography,country } = req.body;
        const u = await pool.query(
        "INSERT INTO artists (artistID,name,age,email,password,followers,biography,country) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [artistID,name,age,email,password,followers,biography,country]
        );
        res.status(200).json({success:'success'})
    }else if(req.method=='PUT'){
        const {artistID,age,email,biography} = req.body
        const u = await pool.query(
            "UPDATE artists SET age=$1,email=$2,biography=$3 WHERE artistID=$3",[age,email,biography,artistID]
        );
        res.status(200).json({success:"success"})
    }
    else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler