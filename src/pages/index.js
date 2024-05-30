import {Image} from "@nextui-org/react";
import Image2 from 'next/image'
import { Inter } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
// import pool from "./api/postgresql";
import Navbar from "../components/Navbar";
import girl from '../../public/girl-music.jpg'
import mic from '../../public/mic.jpg'
export default function Home() {
  // console.log(data);
  return (
    <>
      <div className="flex ">
        <div>
      <div
        aria-hidden="true"
        class="fixed hidden dark:md:block dark:opacity-80 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
      >
        <Image
          src="https://nextui.org/gradients/docs-right.png"
          class="relative z-10 opacity-100 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs right background"
          data-loaded="true"
        />
      </div>
      <div
        aria-hidden="true"
        class="fixed hidden dark:md:block dark:opacity-90 -bottom-[40%] -left-[20%] z-0"
      >
        <Image
          src="https://nextui.org/gradients/docs-left.png"
          class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background"
          data-loaded="true"
        />
      </div>

      <h1
        className="flex text-6xl ml-72 mt-16 font-semibold"
        style={{
          background: "#FFFFFF",
          background: "linear-gradient(to right, #FFFFFF 0%, #02CF45 50%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Music Is The Shorthand
      </h1>
      <h1
        className="flex text-6xl ml-72 mt-10 font-semibold"
        style={{
          background: "linear-gradient(to right, #FFFFFF 0%, #02CF45 30%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Of Emotion
      </h1>
      <p className="text-large ml-72 mt-10">
        Its our mission at <b className="font-bold text-red-500 text-2xl">HarmoniX</b> to give you opportunities
      </p>
      <p className="text-large ml-72">
        to take your music as far as you want it to go.
      </p>
      <Link href='/login'><Button variant="ghost" color="success" className="ml-72 mt-10" size="lg" >
        Get Started{" "}
      </Button>
      </Link>
      <Link href='/about'>
      <Button variant="ghost" color="danger" className="ml-4 mt-10" size="lg" href="/about">
        See More{" "}
      </Button>
      </Link>
      <div className="flex">
        <div
          className="flex flex-col ml-72 mt-10 w-32 p-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(1,214,143,1) 0%, rgba(0,40,27,1) 100%)",
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-center text-large font-bold">320K</div>
          <div className="flex justify-center">Customers</div>
        </div>
        <div
          className="flex flex-col ml-5 mt-10 w-32 p-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(1,214,143,1) 0%, rgba(0,40,27,1) 100%)",
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-center text-large font-bold">47K</div>
          <div className="flex justify-center">Tracks</div>
        </div>
      </div>
      </div>
      <Image2 className="mt-32" src={girl} width={300} style={{height:'250px',borderTopLeftRadius:'70px',borderTopRightRadius:'70px',borderBottomLeftRadius:'70px',borderBottomRightRadius:'70px'}}/>
      <Image2 className="mt-80" src={mic} width={200} style={{height:'200px',borderTopLeftRadius:'70px',borderTopRightRadius:'70px',borderBottomLeftRadius:'70px',borderBottomRightRadius:'70px'}}/>
      </div>
    </>
  );
}
// export async function getServerSideProps() {
//   const query = "SELECT * FROM items";
//   const { rows } = await pool.query(query);
//   return {
//     props: {
//       data: rows,
//     },
//   };
// }
