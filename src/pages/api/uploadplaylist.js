import pool from "./db";

const handler = async(req,res)=>{ 
    if(req.method=='POST'){
        
        const {playlistID,title,description,userID} = req.body;
        const u = await pool.query(
        "INSERT INTO playlists (playlistID,title,description,userID) VALUES($1,$2,$3,$4) RETURNING *",
        [playlistID,title,description,userID]
        );
        res.status(200).json({success:'success'})
    }else if(req.method=='PUT'){
        const {playlistID,songID} = req.body
        let songs = await (await pool.query("SELECT songs from playlists where playlistID=$1",[playlistID])).rows[0].songs
        if(songs==null)songs=[]
        songs.push(songID)
        const u = await pool.query(
            "UPDATE playlists SET songs=$1 where playlistID=$2",[songs,playlistID])
        res.status(200).json({success:'success'})
    }
    else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler