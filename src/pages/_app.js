import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
export default function App({ Component, pageProps }) {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const router = useRouter()
  const [isUser,setIsUser] = useState(true)
  const [user,setUser] = useState({value:null})
  const [key,setKey] = useState(0)
  const logout = () =>{
    localStorage.removeItem("token")
    setUser({value:null})
    setKey(Math.random())
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setUser({value:token})
      setKey(Math.random())
      setIsUser({value:parseJwt(token).isUser})
    }
  },[])
  return (
    <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <Navbar logout={logout} user={user} key={key} isUser={isUser}/>
  <Component {...pageProps} />
  </NextThemesProvider>
  </NextUIProvider>
  )
}
