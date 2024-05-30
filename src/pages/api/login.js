import pool from "./db";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken')
const handler = async(req,res)=>{
    if(req.method=='POST'){
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [
            req.body.email
          ]);
        user=user.rows[0]
        const bytes = CryptoJS.AES.decrypt(user.password,"OPIronman12#$")
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
        console.log(decryptedPass)
        if(user){
            if(req.body.email===user.email && req.body.password===decryptedPass){
                const username = user.username
                const email = user.email
                var token = jwt.sign({userid:user.userid,email:user.email,username:user.username,isUser:true},'jwtsecret',{expiresIn:'2d'})
                res.status(200).json({success:true,token,email,username,isUser:true})
            }else{
                res.status(200).json({success:false,error:"Invalid Credentials"})
            }
        }else{
            res.status(200).json({success:false,error:'User not found'})
        }
    }else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler