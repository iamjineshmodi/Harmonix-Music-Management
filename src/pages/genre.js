import React from 'react'
import Navbar from '../components/Navbar'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import gradient from 'random-gradient'
import { Button } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';
import pool from './api/db';
import Link from 'next/link';
const list = [
  {label: "Hip-Hop", value: "hiphop", description: "The second most popular pet in the world",bg:gradient("Hip-Hop",'horizontal')
},
  {label: "Discover", value: "discover", description: "The most popular pet in the world",bg:gradient("Discov",'horizontal')},
  {label: "Rock", value: "rock", description: "The largest land animal",bg:gradient("Rock",'horizontal')},
  {label: "Mood", value: "mood", description: "The king of the jungle",bg:gradient("Mood",'horizontal')},
  {label: "Party", value: "party", description: "The largest Afghanistan species",bg:gradient("Party",'horizontal')},
  {label: "Electronic", value: "electronic", description: "The tallest land animal",bg:gradient("Electroa",'horizontal')},
  {
    label: "Metal",
    value: "metal",
    description: "A widely distributed and diverse group of aquatic mammals",
    bg:gradient("Metaaaf",'horizontal')
  },
  {label: "Workout", value: "workout", description: "A group of aquatic flightless birds",bg:gradient("Workout",'horizontal')},
  {label: "Chill", value: "chill", description: "A several species of African equids",bg:gradient("Chillabsko",'horizontal')},
  {
    label: "Indie",
    value: "indie",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    bg:gradient("Indid",'horizontal')
  },
  {
    label: "Sleep",
    value: "sleep",
    description: "Diverse group of fully aquatic placental marine mammals",
    bg:gradient("Sleep",'horizontal')
  },
  {label: "Focus", value: "focus", description: "A carnivorous mammal in the subfamily Lutrinae",bg:gradient("Focus",'horizontal')},
  {label: "Jazz", value: "jazz", description: "The second most popular pet in the world",bg:gradient("Jazz",'horizontal')},
  {label: "Classical", value: "classical", description: "The most popular pet in the world",bg:gradient("Classical",'horizontal')},
  {label: "Romance", value: "romance", description: "The largest land animal",bg:gradient("Romance",'horizontal')},
  {label: "Wellness", value: "wellness", description: "The king of the jungle",bg:gradient("Wellness For",'horizontal')},
  {label: "Country", value: "country", description: "The largest Estonia species",bg:gradient("Country",'horizontal')},
  {label: "Latin", value: "latin", description: "The tallest land animal",bg:gradient("Latin",'horizontal')},
  {
    label: "Gaming",
    value: "gaming",
    description: "A widely distributed and diverse group of aquatic mammals",
    bg:gradient("Gaming",'horizontal')
  },
  {label: "Blues", value: "blues", description: "A group of aquatic flightless birds",bg:gradient("Blues",'horizontal')},
  {
    label: "Soul",
    value: "soul",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    bg:gradient("Soul",'horizontal')
  },
  {
    label: "Folk and Acoustic",
    value: "folk",
    description: "Diverse group of fully aquatic placental marine mammals",
    bg:gradient("Folk And ",'horizontal')
  },
  {label: "Summer", value: "summer", description: "A carnivorous mammal in the subfamily Lutrinae",bg:gradient("Summer",'horizontal')},
  {label: "Funk", value: "funk", description: "A large semiaquatic reptile",bg:gradient("Funkysa",'horizontal')},
  {label: "Reggae", value: "reggae", description: "The second most popular pet in the world",bg:gradient("Reggae",'horizontal')},
];
const Genre = ({playlists}) => {
  return (
    <div>
        <div
        aria-hidden="true"
        class="fixed hidden dark:md:block dark:opacity-100 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
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
        class="fixed hidden dark:md:block dark:opacity-100 -bottom-[40%] -left-[15%] z-0"
      >
        <Image
          src="https://nextui.org/gradients/docs-left.png"
          class="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background"
          data-loaded="true"
        />
      </div>
        <div className='flex'>
        <Sidebar playlists={playlists}/>
        <div>
        <p className='font-bold ml-32 text-2xl' style={{flexWrap:'wrap'}}>Browse All</p>
        <div className="flex justify-between ml-32 mr-20  my-5 flex-wrap">
        {list.map((item,index)=>(
        <Link key={index} href={`/genre/${item.value}`}><Card className='flex justify-center text-3xl font-bold w-48 h-40 mx-4 my-5'  shadow="sm" style={{
            background:
              item.bg,
            borderRadius: "10px",
            alignItems:'center'}} isPressable onPress={() => console.log("item pressed")}>
            <h1 className='text-3xl font-bold'>{item.label}</h1>
        </Card></Link>
        ))}
        </div>
          </div>
          </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  let playlists = (await pool.query("SELECT * FROM playlists")).rows;
  // console.log(playlists);
  return {
    props: {playlists:JSON.parse(JSON.stringify(playlists)) },
  };
}
export default Genre