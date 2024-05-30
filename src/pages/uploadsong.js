import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useRouter,useEffect } from 'react';
import Router from 'next/router'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image,Input,Button,Select,SelectItem} from "@nextui-org/react";
import { nanoid } from 'nanoid';
import { genres } from './genres';
export default function Uploadsong() {
  const handleSelectionChange = (e) => {
    setGenre(e.target.value);
  };
    const [isUser,setIsUser] = useState(true)
  const [user,setUser] = useState({value:null})
  const [key,setKey] = useState(0)
  const[artistID,setArtistID] = useState("")
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
//   const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setUser({value:token})
      setKey(Math.random())
      setIsUser(parseJwt(token).isUser)
      setArtistID(parseJwt(token).artistid)
      // console.log(token)
    }else{
        Router.push('http://localhost:3000/login')
    }
  },[])
  // setFile(upload.single(file))
  const onSubmitForm = async(e) => {
    e.preventDefault();
      const body =  {songID,title,file,img,genre,artistID,albumtitle};
      const res = await fetch("http://localhost:3000/api/uploadsong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      console.log(response)
      if(response.success){
        alert("Song uploaded successfully")
      }else{
        alert("Song couldn't be uploaded")
      }
      setTitle('')
      setFile('')
      setAlbumTitle('')
      setGenre('')
      setImage('')
    };
    // console.log(parseJwt(user.value))
    const songID = nanoid()
    const [title,setTitle] = useState("")
  const [albumtitle,setAlbumTitle] = useState("")
  const [file,setFile] = useState("")
  const [img,setImage] = useState("")
  const [genre,setGenre] = useState("")
  // console.log(file)

  return (
    <div className='flex justify-center'>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 justify-center text-3xl font-semibold" >
        Upload your song here
      </CardHeader>
      <Divider/>
      <CardBody>
        <form onSubmit={onSubmitForm}>
        <Input className='mt-10' value={title} onChange={e=>setTitle(e.target.value)} type='text'  label='Title' placeholder='Enter song title' variant='bordered' color='success' isRequired/>
        {/* <Input className='mt-5' value={duration} onChange={e=>setDuration(e.target.value)} type='number' label='Age' placeholder='Enter your Age' variant='bordered' color='success' isRequired/> */}
        {/* <Input className='mt-5' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' isRequired/> */}
        <Select
        label="Genre"
        variant="bordered"
        placeholder="Select genre of your song"
        selectedKeys={[genre]}
        className="mt-5"
        onChange={handleSelectionChange}
        color='success'
        isRequired
      >
        {genres.map((genres) => (
          <SelectItem key={genres.value} value={genres.value}>
            {genres.label}
          </SelectItem>
        ))}
      </Select>
        <Input className='mt-5' value={img} type="text" onChange={e=>setImage(e.target.value)} label='File' placeholder='Enter your cover image URL here' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={file} type="text" onChange={e=>setFile(e.target.value)} label='File' placeholder='Enter your file URL here' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={albumtitle} type="text" onChange={e=>setAlbumTitle(e.target.value)} label='File' placeholder='Enter album title here' variant='bordered' color='success'/>
        <Button className='mt-10' type='submit' color='success' style={{color:'white',width:'200px',borderRadius:'20px'}}>UPLOAD</Button>
        </form>
      </CardBody>
      <Divider/>
    </Card>
    </div>
  )
}
