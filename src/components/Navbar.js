import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,Dropdown,DropdownMenu,DropdownItem,DropdownTrigger,Avatar} from "@nextui-org/react";
import { XLogo } from "./XLogo";
export default function App({logout,user,isUser}) {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  if(user){
  console.log(parseJwt(user.value))
  }
  return (

    <Navbar>  
      <NavbarBrand>
        <XLogo />
        <p className="font-bold text-inherit text-2xl">HarmoniX</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="success" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/about" color="primary" aria-current="page">
            About
          </Link>
        </NavbarItem>
        {user.value&&
        <>
        <NavbarItem isActive>
          <Link color="danger" href="/songs">
            Songs
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
        <Link color="warning" href="/genre">
          Genres
        </Link>
      </NavbarItem>
      </>
      }
      </NavbarContent>
      {!user.value&&<NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Button as={Link} color="success" variant="flat" href="/login">Login</Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>}
      {user.value&&<NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="flex font-semibold">Welcome {parseJwt(user.value).isUser&&<p className="font-bold text-green-500 ml-1">{parseJwt(user.value).username}</p>} {!(parseJwt(user.value).isUser)&&<p className="font-bold text-green-500 ml-1">{parseJwt(user.value).username}</p>}</p>
              {!(parseJwt(user.value).isUser)&&<p className="font-bold mt-1">Your Followers: {parseJwt(user.value).followers}</p>}
            </DropdownItem>
            <DropdownItem key="edit mb-4"  color="success">
              <Link href="/editprofile">Edit Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" onClick={logout} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>}
    </Navbar>
  );
}
