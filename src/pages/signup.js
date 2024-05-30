import React, { useState } from 'react'
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
const Signup = () => {
  const [isUser,setIsUser]= useState("user")
  const artistID = nanoid()
  const userID = nanoid()
  const[age,setAge]=useState(0)
  const [username,setUsername] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword] = useState("")
  const [biography,setBiography]=useState("")
  const [country,setCountry] = useState("")
  const [followers,setFollowers]=useState(0)
  const handleSelectionChange = (e) => {
    setCountry(e.target.value);
  };
  console.log(biography)
  const onSubmitForm = async(e) => {
    e.preventDefault();
      const body = { userID,username,age,email,password:CryptoJS.AES.encrypt(password,"OPIronman12#$").toString() };
      console.log(body)
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      console.log(response)
      if(response.success){
        alert("User signup successful please login to continue")
      }else{
        alert("Something is wrong")
      }
      setEmail('')
      setAge(0)
      setPassword('')
      setUsername('')
  };
  const onSubmitArtistForm = async(e) => {
    e.preventDefault();
      const body = { artistID,name,age,email,password:CryptoJS.AES.encrypt(password,"OPIronman12#$").toString(),followers,biography,country };
      console.log(body)
      const res = await fetch("http://localhost:3000/api/artistsignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      console.log(response)
      if(response.success)
      alert("Artist signup successful please login to upload songs")
    else
    alert("Something is wrong")
      setEmail('')
      setAge(0)
      setPassword('')
      setUsername('')
      setBiography('')
      setCountry('')
      setFollowers(0)
  };
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
        <p className='text-3xl font-bold mt-10'>Million of Songs.</p>
        <p className='text-3xl font-bold mt-1'>Free on HarmoniX.</p>
        <form onSubmit={onSubmitForm}>
        <Input className='mt-10' value={username} onChange={e=>setUsername(e.target.value)} type='text'  label='Username' placeholder='Enter your Username' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={age} onChange={e=>setAge(e.target.value)} type='number' label='Age' placeholder='Enter your Age' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={password} onChange={e=>setPassword(e.target.value)} type='password' label='Password' placeholder='Enter your Password' variant='bordered' color='success' isRequired/>
        <Button className='mt-10' type='submit' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>SIGN UP</Button>
        </form>
        <p className='mt-5'>Already have an account? <Link href="/login"><u className='text-green-500'>  LOGIN HERE</u></Link></p>
      </div>
        </Tab>
              <Tab key="artist" title="Artist">
              <div className="flex flex-col justify-center mt-10 bg-gray-950 login p-10" style={{borderRadius:'15px',alignItems:'center'}}>
         <Image src={logo} width={300}/>
        <form onSubmit={onSubmitArtistForm}>
        <Input className='mt-10' value={name} onChange={e=>setName(e.target.value)} type='text'  label='Name' placeholder='Enter your Name' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={age} onChange={e=>setAge(e.target.value)} type='number' label='Age' placeholder='Enter your Age' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={email} onChange={e=>setEmail(e.target.value)} type='email' label='Email' placeholder='Enter your Email' variant='bordered' color='success' isRequired/>
        <Input className='mt-5' value={password} onChange={e=>setPassword(e.target.value)} type='password' label='Password' placeholder='Enter your Password' variant='bordered' color='success' isRequired/>
        <Textarea className='mt-5' value={biography} onValueChange={setBiography} label='Biography' placeholder='Enter your Biography' variant='bordered' color='success'/>
        <Select
        label="Country"
        variant="bordered"
        placeholder="Select your country"
        selectedKeys={[country]}
        className="mt-5"
        onChange={handleSelectionChange}
        color='success'
        isRequired
      >
        {countries.map((countries) => (
          <SelectItem key={countries.value} value={countries.value}>
            {countries.label}
          </SelectItem>
        ))}
      </Select>
        <Button className='mt-10' type='submit' color='success' style={{color:'white',width:'400px',borderRadius:'20px'}}>SIGN UP</Button>
        </form>
        <p className='mt-5'>Already have an account? <Link href="/login"><u className='text-green-500'>  LOGIN HERE</u></Link></p>
      </div>
              </Tab>
            </Tabs>
        </div>
    </>
  )
}

export default Signup