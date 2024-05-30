import pool from "./db";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken')
const handler = async(req,res)=>{
    if(req.method=='POST'){
        let user = await pool.query("SELECT * FROM artists WHERE email = $1", [
            req.body.email
          ]);
        user=user.rows[0]
        const bytes = CryptoJS.AES.decrypt(user.password,"OPIronman12#$")
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
        console.log(decryptedPass)
        console.log(bytes)
        if(user){
            if(req.body.email===user.email && req.body.password===decryptedPass){
                const username = user.name
                const followers = user.followers
                const email = user.email
                var token = jwt.sign({artistid:user.artistid,email:user.email,username:user.name,isUser:false},'jwtsecret',{expiresIn:'2d'})
                res.status(200).json({success:true,token,email,username,followers,isUser:false})
            }else{
                res.status(200).json({success:false,error:"Invalid Credentials"})
            }
        }else{
            res.status(200).json({success:false,error:'Artist not found'})
        }
    }else{
        res.status(400).json({error:'Back Door entry is restricted'})
    }
}
export default handler