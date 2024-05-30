import pool from "./db";
import {NextResponse} from 'next/server'
import {writeFile} from 'fs/promises'

const handler = async(req,res)=>{ 
    if(req.method=='POST'){

        const {albumID,title} = req.body;
        console.log(req.body)
        const u = await pool.query(
        "INSERT INTO albums (albumID,title) VALUES($1,$2) RETURNING *",
        [albumID,title]
        );
        res.status(200).json({success:'success'})
    }else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler