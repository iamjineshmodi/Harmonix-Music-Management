import {React,useState,useEffect} from "react"
import {Button} from '@nextui-org/react'
export default function App({song,playlist}){
    const onSubmitForm = async(e) => {
        e.preventDefault();
        // console.log(playlist)
        let songs = playlist.songs
        if(songs==null)songs=[]
        const songID = song.songid
         if(!songs.includes(songID)){

           const playlistID = playlist.playlistid
             const body = { playlistID,songID};
             // console.log(body)
             const res = await fetch("http://localhost:3000/api/uploadplaylist", {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body)
             });
             let response = await res.json()
             console.log(response)
             // setTitle('')
             location.reload()
             // setDescription('')
            }else{
              alert("Song already exists in the playlist")
            }
          }
    return(
        <>
            <Button color="success" variant="ghost" type="submit" onClick={onSubmitForm} >{playlist.title}</Button>
        </>
    )
}