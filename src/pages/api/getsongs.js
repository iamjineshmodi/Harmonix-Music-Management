import pool from "./db";

const handler = async(req,res)=>{ 
    if(req.method=='GET'){
        
        const songs = await pool.query("SELECT * FROM songs");
        res.status(200).json(songs.rows)
    }else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler