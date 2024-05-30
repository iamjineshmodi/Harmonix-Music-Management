import React from 'react'
import { useState,useEffect } from 'react'
import bg from '../../public/LoginBG.jpeg'
import Image from 'next/image'
import logo from '../../public/XLogo.png'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import Navbar from '../components/Navbar'
import CryptoJS from 'crypto-js'
import { Jwt } from 'jsonwebtoken'
import Link from 'next/link'
import Router from 'next/router'
import {Tabs,Tab} from '@nextui-org/react'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword] = useState("")
  const [isUser,setIsUser]= useState("user")
  const [user,setUser]=useState([])
  const [artist,setArtist] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {email,password}
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      let response =await res.json()
      console.log(response)
      setEmail('')
      setPassword('')
      if(response.success){
        alert("Login Succesfull")
        Router.push("http://localhost:3000")
        localStorage.setItem('token',response.token)
      }else{
        alert("Please try again")
      }
  }
  const handleArtistSubmit = async (e) => {
    e.preventDefault()
    const data = {email,password}
    const res = await fetch("http://localhost:3000/api/artistlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      let response =await res.json()
      console.log(response)
      setEmail('')
      setPassword('')
      if(response.success){
        alert("Login Succesfull")
        Router.push("http://localhost:3000")
        localStorage.setItem('token',response.token)
      }else{
        alert("Please try again")
      }
  }
  return (
    <>
      <div className='flex flex-col justify-center' style={{height:'100vh',alignItems:'center',backgroundImage:`url(${bg.src})`}}>
      <Tabs 
            className='mt-10'
            aria-label="Options"         
            selectedKey={isUser}
            onSelectionChange={setIsUser}
            color='success'
          >
              <Tab key="user" title="User">  
              <div className="flex flex-col justify-center bg-gray-950 login p-10" style={{borderRadius:'15px',alignItems:'center'}}>
            <Image src={logo} width={300}/>
               <p className='text-3xl font-bold mt-10'>Million of Songs.</p>
              <p className='text-3xl font-bold mt-1'>Free on HarmoniX.</p>
              <form onSubmit={handleSubmit}>
              <Input className='mt-10' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' isRequired/>
              <Input className='mt-5'value={password} onChange={e=>setPassword(e.target.value)} type='password' label='Email' placeholder='Enter your Password' variant='bordered' color='success' isRequired/>
              <Button type='submit' className='mt-10' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>LOG IN</Button>
              </form>
              <p className='mt-5'>{`Don't have an account?`} <Link href="/signup"><u className='text-green-500'>  SIGNUP</u></Link></p>
              </div>
              </Tab>
              <Tab key="artist" title="Artist">
              <div className="flex flex-col justify-center bg-gray-950 login p-10" style={{borderRadius:'15px',alignItems:'center'}}>
            <Image src={logo} width={300}/>
              <p className='text-3xl font-bold mt-10'>Upload your songs.</p>
              <form onSubmit={handleArtistSubmit}>
              <Input className='mt-10' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' isRequired/>
              <Input className='mt-5'value={password} onChange={e=>setPassword(e.target.value)} type='password' label='Email' placeholder='Enter your Password' variant='bordered' color='success' isRequired/>
              <Button type='submit' className='mt-10' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>LOG IN</Button>
              </form>
              <p className='mt-5'>{`Don't have an account?`} <Link href="/signup"><u className='text-green-500'>  SIGNUP</u></Link></p>
              </div>
              </Tab>
        </Tabs>
        
    </div>
    </>
  )
}

export default Login