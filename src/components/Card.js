import React, { useEffect, useState } from 'react';
import {Card,CardBody,Image,Button} from '@nextui-org/react'
import { PlayArrow } from '@mui/icons-material';
import { Pause } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function App({song,imgsrc,title,artist,album,sendDataToParent,index}){
    // const [isHovered,setIsHovered] = useState(false)
  const [isHovered,setIsHovered]=useState(false)
  const [value,setValue] = useState(false)
  const [currsong,setCurrSong] = useState()
  const handleMouseEnter = () => {
    setIsHovered(true)
  };

  const handleMouseLeave = () => {
    setIsHovered(false)
  };

  function handleSong(){
    // setValue(!value)
    // await setCurrSong(song)
    sendDataToParent({song,value,index});
  }
//   console.log(currsong)
    useEffect(()=>{
        if(value)setValue(!value)
        else setValue(value)
    },[value])
    return (
      <Card
        className={`card ${isHovered ? 'bg-green-950' : ''} `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{borderRadius:'0px'}}
      >
        <CardBody className='flex flex-row' style={{alignItems:'center'}}>
            <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                value={value}
                onPress={handleSong}
              >
                {value&&<Pause fontSize="medium" />}
                {!value&&<PlayArrow  fontSize="medium"/>}
              </Button>
              <div className='w-40 ml-10'>
            <Image
              alt="Album cover"
              className="object-cover"
              width={80}
              shadow="md"
              src={imgsrc}

            />
            </div>
            <div className="flex flex-col w-52">
            <h2 className=' font-bold'>{title}</h2>
            <h2 className=' font-light'>{artist}</h2>
            </div>
            <div className='w-48'>
            <h2 className=' font-light' style={{alignItems:'center'}}>{album}</h2>
            </div>
            <div className='flex font-light w-52' style={{alignItems:'center'}}>
            <AccountCircleIcon className='mr-2' fontSize='medium'/>
            <h2>{artist}</h2>
            </div>
            <div className='w-20'>
            <h2 className=' font-light' style={{alignItems:'center'}}>6:25</h2>
            </div>

        </CardBody>
        {/* <p>{content}</p> */}
      </Card>
    );
}

