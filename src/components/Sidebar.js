import {React,useState,useEffect} from 'react'
import {Popover,PopoverTrigger,PopoverContent,Input,Button,Textarea,Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure, Dropdown,DropdownItem,DropdownTrigger,DropdownMenu} from '@nextui-org/react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Router from 'next/router'
import Link from 'next/link'
import { nanoid } from 'nanoid';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import pool from '../../src/pages/api/db'
export default function App({playlists}) {
  const playlistID = nanoid()
  const [title,setTitle] = useState(" ")
  const [description,setDescription] = useState(" ")
  const [userID,setUserID] = useState({value:null})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const onSubmitForm = async(e) => {
    e.preventDefault();
      const body = { playlistID,title,description,userID};
      console.log(body)
      const res = await fetch("http://localhost:3000/api/uploadplaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      let response = await res.json()
      if(response.success){
        toast.success("Playlist Created Successfully!")
      }
      console.log(response)
      setTitle('')
      setDescription('')
  };
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){

      setUserID(parseJwt(token).userid)
      // console.log(token)
    }else{
      Router.push('http://localhost:3000/login')
    }
  },[])
  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="flex flex-col justify-center px-1 py-2 gap-2 w-full" style={{alignItems:'center'}}>
          <p className="text-small font-bold text-foreground" {...titleProps}>
            New Playlist
          </p>
            <form className="mt-2 flex flex-col gap-2 w-full" onSubmit={onSubmitForm}>
            <Input value={title} onChange={e=>setTitle(e.target.value)} label="Title" type='text' size="sm" variant="bordered" color='danger'  isRequired/>
            <Textarea value={description} onChange={e=>setDescription(e.target.value)} type='text' label="Description" size="sm" color='danger' variant="bordered" />
            <Button type='submit' color='success' variant='ghost'>Create</Button>
            </form>
        </div>
      )}
    </PopoverContent>
  )
  return (
    <div className='flex z-10'>
        <div >
            <Link href='/' ><p className='my-4 ml-10 font-bold'><HomeIcon fontSize='medium'/>  Home</p></Link>
            <p className='my-4 ml-10 font-bold'><SearchIcon fontSize='medium'/>  Search</p>
            <p className='my-4 ml-10 font-bold'><LibraryMusicIcon fontSize='medium'/>  Your Library</p>
            <Dropdown placement='bottom-end' className='ml-7'>
              <DropdownTrigger>
                <Button className='mb-6 ml-10 font-bold bg-transparent p-0'><SubscriptionsIcon fontSize='medium'/>Playlists</Button>
              </DropdownTrigger>
              <DropdownMenu variant='faded' color='success'>
                {playlists.map((playlist)=>(

                <DropdownItem key={playlist.playlistid} href={`/playlist/${playlist.playlistid}`}>{playlist.title}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
                <Button onPress={onOpen} className='flex font-bold ml-10' variant='solid' color='success' style={{color:'white',alignItems:'center'}} startContent={<PlaylistAddIcon/>}>Create Playlist</Button>
                <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                  <ModalContent>
                    {(onClose)=>(
                      <>
                        <ModalHeader className="flex flex-col gap-1">New Playlist</ModalHeader>
                        <ModalBody>
                        <form className="mt-2 flex flex-col gap-6 w-full" style={{alignItems:'center'}} onSubmit={onSubmitForm}>
                        <Input value={title} onChange={e=>setTitle(e.target.value)} label="Title" type='text' size="sm" variant="bordered" color='danger'  isRequired/>
                        <Textarea value={description} onChange={e=>setDescription(e.target.value)} type='text' label="Description" size="sm" color='danger' variant="bordered" />
                        <Button onPress={onClose} type='submit' color='success' variant='ghost' className='size-3/6'>Create</Button>
                        </form>
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                {/* <ToastContainer className='z-10' position='bottom-center' closeOnClick autoClose={2000} hideProgressBar={false} pauseOnHover theme='dark' transition='slide' /> */} 
            <Link href='/likedsongs'><Button className='flex font-bold mt-5 ml-10' variant='solid' color='danger' style={{color:'white',alignItems:'center'}} startContent={<FavoriteIcon/>}>Liked Songs</Button></Link>
        </div>
    </div>
  )
}
