import pool from "./db";

const handler = async(req,res)=>{ 
    if(req.method=='POST'){
        
        const {songID,liked} = req.body;
        const u = await pool.query(
        "INSERT INTO songs (liked) VALUES($1) where songID=$2 RETURNING *",
        [liked,songID]
        );
        res.status(200).json({success:'success'})
    }else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler