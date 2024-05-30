import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// import Songcard from "../components/Songcard";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Image, Button, Divider,Slider } from "@nextui-org/react";
import App from "../components/Card";
import {Card,CardBody} from '@nextui-org/react'
import { PlayArrow } from "@mui/icons-material";
import { Pause } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import pool from "./api/db";
import {HeartIcon} from "../components/HeartIcon";
import {PauseCircleIcon} from "../components/PauseCircleIcon";
import {PlayCircleIcon} from '../components/PlayCircleIcon'
import {NextIcon} from "../components/NextIcon";
import {PreviousIcon} from "../components/PreviousIcon";
import {RepeatOneIcon} from "../components/RepeatOneIcon";
import {ShuffleIcon} from "../components/ShuffleIcon";
import { CurrencyBitcoin, PlayCircle } from "@mui/icons-material";
import { PauseCircle } from "@mui/icons-material";
import { Howl,Howler } from "howler";
// import ReactHowler from 'react-howler'
// import { useGlobalAudioPlayer,useAudioPlayer } from "react-use-audio-player";
// import { pause } from "react-native-track-player/lib/src/trackPlayer";
import useSound from 'use-sound'
const Songs = ({ songs,playlists }) => {
  // const {load} = useAudioPlayer()
  const [value, setValue] = useState(false);
  const [song, setSong] = useState(songs[0]);
  // console.log(song)
  const [play,{pause,duration,sound}]=useSound(song.file)
  const [currTime,setCurrTime] = useState({min:'',sec:''})
  const [seconds,setSeconds] = useState()
  const [index,setIndex] = useState(0)
  const [loop,setLoop] = useState(false)
  useEffect(()=>{
    const sec = duration/1000;
    const min = Math.floor(sec/60)
    const secRemain = Math.floor(sec%60)
    const time = {
      min:min,
      sec:secRemain
    }
  })
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  //     const [value,setValue] = useState(0)
  //     useEffect(()=>{
  //         play()
  //     },[value])
  //    async function play(){
  //     console.log("song req sent ")
  //      await   new Audio('https://pagalworld.cx/files/download/id/94176').play()
  //    console.log("song req sent ")
  // }
  // const getSongs = async()=>{
  //   try{
  //   const res = await fetch("http://localhost:3000/api/getsongs", {
  //       method: "GET"
  //     });
  //     let response = await res.json()
  //     setSongs(response)
  //     // console.log(response)
  //   }catch(err){
  //     console.error(err.message);
  //   }
  // }
  // useEffect(()=>{
  //   getSongs()
  // },[]);
  // console.log(songs)
  useEffect(()=>{
      setSong(songs[index])
      // setValue(false)
  },[index])
  function handleDataFromChild(currsong){
    setSong(currsong.song)
    setValue(currsong.value)
    setIndex(currsong.index)
  }
  console.log(value)
  function playingButton(){
    if(value){
      pause()
      setValue(false)
    }else{
      play()
      setValue(true)
    }
  }
  
  useEffect(()=>{
      if(loop){
        setValue(true)
      }else{
        setValue(false)
      }
  },[loop])
  // console.log(seconds)
  // console.log(duration/1000)
  // console.log(son)
  // function play(){
  //   console.log("s")
  //   const audio = load('https://pagalfree.com/download/128-Rasiya%20Reprise%20-%20Brahmastra%20128%20Kbps.mp3',{
  //     // autoplay:true,
  //       html5:true,
  //       format:'mp3'
  //     })
    
  //     // console.log("Playing now ")
  // }
  // useEffect(()=>{
  //   if(value){
  //     load(song.file, {
  //       autoplay: true,
  //       // onend: () => setSongIndex(songIndex + 1)
  //       format:'mp3'
  //     });
  //   }else{
      
  //   }
    
  // },[value,load])
  console.log(index)
  return (
    <div>
      <div className="flex">
        <Sidebar playlists={playlists} />
        <div
          aria-hidden="true"
          class="fixed hidden dark:md:block dark:opacity-100 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
        >
          <img
            src="https://nextui.org/gradients/docs-right.png"
            class="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
            data-loaded="true"
          />
        </div>
        <div
          aria-hidden="true"
          class="fixed hidden dark:md:block dark:opacity-100 -bottom-[40%] -left-[15%] z-0"
        >
          <img
            src="https://nextui.org/gradients/docs-left.png"
            class="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs left background"
            data-loaded="true"
          />
        </div>
        <div className="flex flex-col ml-40 mt-10 mb-10">
          <div className="flex flex-row mb-2">
            <h2 className="ml-64 font-bold">Title</h2>
            <h2
              className="font-bold"
              style={{ alignItems: "center", marginLeft: "170px" }}
            >
              Album
            </h2>
            <h2 className="ml-36 font-bold" style={{ alignItems: "center" }}>
              Added By
            </h2>
            <h2
              className=" font-bold"
              style={{ alignItems: "center", marginLeft: "136px" }}
            >
              <QueryBuilderIcon />
            </h2>
          </div>
          <Divider className="mb-5" orientation="horizontal" />
          {songs.map((song,index) => (
            <>
            <App
            key={index}
            song={song}
            imgsrc={song.img}
            title={song.title}
            artist={song.artistname}
            album={song.albumtitle}
            sendDataToParent={handleDataFromChild}
            index={index}
            />
            
          {/* {console.log(index)} */}
          </>
          ))}

          {/* <Card /> */}
          {/* <Card /> */}
        </div>
      </div>
      {/* <Button onClick={()=>setValue(value+1)}>Play Sound</Button> */}
      {/* <Songcard title={song.title} albumtitle={song.albumtitle} src={song.file} imgsrc={song.img} value={value} sendDataToParent={handleDataFromChild2}/> */}
      <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1520px] bottom-0 "
      // style={{position:"fixed"}}
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="flex relative col-span-6 md:col-span-4 justify-center">
            <Image
              alt="Album cover"
              className="object-cover"
              height={300}
            //   width={300}
              shadow="md"
              src={song.img}
              width="60%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8 mr-10">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{song.title}</h3>
                <h1 className="text-large font-medium mt-2">{song.albumtitle}</h1>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <input
              type="range"
                min={0}
                max={duration/1000}
                default={0}
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                value={seconds}
                onChange={(e)=>{
                  sound.seek([e.target.value]);
                }}
              />
              <div className="flex justify-between">
              <p className="text-small">{`${currTime.min}:${currTime.sec}`}</p>
                <p className="text-small text-foreground/50">{`${parseInt(Math.floor(duration/60000))}:${Math.floor(duration/1000)%60}`}</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 mx-2"
                radius="full"
                variant="light"
                value={loop}
                onClick={()=>setLoop(!loop)}
              >
                {!loop&&<RepeatOneIcon className="text-foreground/8" />}
                {loop&&<RepeatOneIcon className="text-foreground/8 text-green-600" />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 mx-2"
                radius="full"
                variant="light"
                onClick={()=>setIndex(index-1)}
              >
                <PreviousIcon />
              </Button>
              {/* <ReactHowler playing ={playing} preload={true} src={[src]}/> */}
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10 mx-2"
                radius="full"
                variant="light"
                value={value}
                onClick={playingButton}
              >
                {value&&<PauseCircle fontSize="large" />}
                {!value&&<PlayCircle  fontSize="large"/>}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                // onClick={nextTrack}
                onClick={()=>setIndex(index+1)}
              >
                <NextIcon />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 mx-2"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </div>
  );
};
export async function getServerSideProps(context) {
  let songs = (await pool.query("SELECT * FROM songs where liked=$1",[true])).rows;
  let playlists = (await pool.query("SELECT * FROM playlists")).rows;
  // console.log(playlists);
  return {
    props: { songs: JSON.parse(JSON.stringify(songs)),playlists:JSON.parse(JSON.stringify(playlists)) },
  };
}
export default Songs;
