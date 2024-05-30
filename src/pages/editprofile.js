import React, { useState,useEffect } from 'react'
import bg from '../../public/LoginBG.jpeg'
import Image from 'next/image'
import logo from '../../public/XLogo.png'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import Navbar from '../components/Navbar'
import { nanoid } from 'nanoid'
import CryptoJS from 'crypto-js'
import Link from 'next/link'
import {Tabs,Tab} from '@nextui-org/react'
import {Select,SelectItem} from '@nextui-org/react'
import { countries } from './countries'
import {Textarea} from '@nextui-org/react'
import pool from './api/db'
const Signup = ({users}) => {
    console.log(users)
    const [isUser,setIsUser] = useState(true)
    const [user,setUser] = useState({value:null})
    const [key,setKey] = useState(0)
    const[age,setAge]=useState(0)
  const [email,setEmail]=useState("")
  const [biography,setBiography]=useState("")
  const handleSelectionChange = (e) => {
    setCountry(e.target.value);
  };
  const[artistID,setArtistID] = useState("")
  const[userID,setUserID] = useState("")
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
      setUserID(parseJwt(token).userid)
    //   console.log(token)
    }else{
        Router.push('http://localhost:3000/login')
    }
  },[])
  console.log(biography)
  const onSubmitForm = async(e) => {
    e.preventDefault();
      const body = { userID,age,email};
      console.log(body)
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      if(response.success){
        alert("Profile edited successfully")
      }else{
        alert("Error")
      }
      console.log(response)
      setEmail('')
      setAge(0)
  };
  const onSubmitArtistForm = async(e) => {
    e.preventDefault();
      const body = { artistID,age,email,biography};
      console.log(body)
      const res = await fetch("http://localhost:3000/api/artistsignup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      if(response.success){
        alert("Profile edited successfully")
      }else{
        alert("Error")
      }
      console.log(response)
      setEmail('')
      setAge(0)
      setBiography('')
  };
//   console.log(userID)
  return (
    <>
      <div className='flex flex-col justify-center' style={{alignItems:'center',backgroundImage:`url(${bg.src})`,backgroundSize:'cover'}}>
          <Tabs 
            className='mt-10'
            aria-label="Options"         
            selectedKey={isUser}
            onSelectionChange={setIsUser}
            color='success'
          >
              <Tab key="user" title="User">
        <div className="flex flex-col justify-center mt-10 bg-gray-950 login p-10" style={{borderRadius:'15px',alignItems:'center'}}>
         <Image src={logo} width={300}/>
        <p className='text-3xl font-bold mt-10'>Edit your profile</p>
        <form onSubmit={onSubmitForm}>
        <Input className='mt-5' value={age} onChange={e=>setAge(e.target.value)} type='number' label='Age' placeholder='Enter your Age' variant='bordered' color='success' />
        <Input className='mt-5' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' />
        <Input className='mt-5' isDisabled type='password' label='Password' placeholder='Enter your Password' variant='bordered' color='success' />
        <Button className='mt-10' type='submit' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>EDIT PROFILE</Button>
        </form>
      </div>
        </Tab>
              <Tab key="artist" title="Artist">
              <div className="flex flex-col justify-center mt-10 bg-gray-950 login p-10" style={{borderRadius:'15px',alignItems:'center'}}>
         <Image src={logo} width={300}/>
        
         <p className='text-3xl font-bold mt-10'>Edit your profile</p>
        <form onSubmit={onSubmitArtistForm}>
        <Input className='mt-5' value={age} onChange={e=>setAge(e.target.value)} type='number' label='Age' placeholder='Enter your Age' variant='bordered' color='success' />
        <Input className='mt-5' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' />
        <Input className='mt-5' isDisabled  type='password' label='Password' placeholder='Enter your Password' variant='bordered' color='success' />
        <Textarea className='mt-5' value={biography} onValueChange={setBiography} label='Biography' placeholder='Enter your Biography' variant='bordered' color='success'/>
        <Button className='mt-10' type='submit' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>SIGN UP</Button>
        </form>
      </div>
              </Tab>
            </Tabs>
        </div>
    </>
  )
}
export async function getServerSideProps(context) {
    let user = (await pool.query("SELECT * FROM users")).rows;
    console.log(user)
    return {
      props: { users: JSON.parse(JSON.stringify(user))},
    };
  }
export default Signup