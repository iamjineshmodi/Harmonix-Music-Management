import pool from "./db";

const handler = async(req,res)=>{ 
    if(req.method=='POST'){
        
        const {songID,title,file,img,genre,artistID,albumtitle} = req.body;
        const artistname = (await pool.query("SELECT name from artists where artistID=$1",[artistID])).rows[0].name
        const u = await pool.query(
        "INSERT INTO songs (songID,title,file,img,genre,artistID,albumtitle,artistname) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [songID,title,file,img,genre,artistID,albumtitle,artistname]
        );
        res.status(200).json({success:'success'})
    }else if(req.method=='PUT'){
        const {songID,liked} = req.body
        const u = await pool.query(
            "UPDATE songs SET liked=$1 WHERE songID=$2",[!liked,songID]
        );
        res.status(200).json({success:'success'})
    }else if(req.method=='DELETE'){
        const {playlistID,songID} = req.body
        console.log(playlistID)
        const songs = (await pool.query("SELECT songs from playlists where playlistID=$1",[playlistID])).rows.songs
        console.log(songs)
        let index=-1
        for(let song in songs){
            if(songs[song]===(songID))index=song
        }
        console.log(index)
        // songs.splice(index,1)
        // const u = await pool.query(
        //     "UPDATE playlists set songs=$1",[songs]
        // )
        res.status(200).json({success:"Song Delete successfully"})
    }
    else{
        res.status(400).json({error:'This method is not allowed'})
    }
}
export default handler