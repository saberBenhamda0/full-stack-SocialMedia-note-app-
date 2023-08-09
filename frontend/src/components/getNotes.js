"use client"
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../app/layout'
import HandleSubmit from './getNotes'
import moment from 'moment';
import BookmarkIcon from 'public/icons/bookmark.svg';
import smallBookmarkIcon from 'public/icons/smallbookmark.svg';
import smallheart from 'public/icons/smallheart.svg';
import HeartIcon from 'public/icons/heart.svg';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';




function GetNotes() {
  let router = useRouter()
  let [clickedBookmark, setClickedBookmark] = useState(false)
  let [clickedHeart, setClickedHeart] = useState(false)
  let [notes, setNotes] = useState([])
  let username = localStorage.getItem('username')
  let auth = localStorage.getItem('access_token' )
  const formattedTime = moment(notes.created_at).fromNow();

  const authHeader = {
    'Authorization': `Bearer ${auth}`
    };
  let handleSubmit  = async (e) => {


      let res = await fetch('http://localhost:8000/api/allNotes/',{
       method:"GET",
       headers:{'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${auth}`
                },
     })
     let notes = await res.json()
     setNotes(notes)
 }

 useEffect( () =>{
   handleSubmit()
  }, [clickedBookmark, clickedHeart])

  const handleBoookmarkClick = (noteId) => {
    setClickedBookmark(prevState => ({
      ...prevState,
      [noteId]: !prevState[noteId]
    }));
  };
  const handleHeartedClick = (noteId) => {
    setClickedHeart(prevState => ({
      ...prevState,
      [noteId]: !prevState[noteId]
    }));
  };




  let handleClickBookmark = (noteId) => { 
    handleBoookmarkClick(noteId)
    let bookmark = fetch(`http://localhost:8000/api/bookmark/note/${noteId}/`,
    {method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${auth}`
     },
  }
    )

  }


  let handleClickHeart  = async (noteId) => { 
    handleHeartedClick(noteId)
    let bookmark = await fetch(`http://localhost:8000/api/heart/note/${noteId}/`,
    {method:'GET',
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${auth}`
   },
})

}

const handleClickPost = (noteId) =>{
  router.push(`post/${noteId}`)

}



    return (
    <main>
    <h1 className='text-white text-[25px] font-bold leading-[70px] tracking-wide font-outfit'>latest note posted by users</h1>
    <div className='h-screen overflow-y-scroll scrollbar-hide'>

      {notes.map((note) => {
        return(
          
          <motion.div
          whileHover={{ scale:0.95}}
          className='flex flex-col shadow-lg rounded-m hover:shadow-2xl transition-all duration-300 ease-linear	 text-gray-300 hover:cursor-pointer border-solid border-gray-700 border-t-[1px] border-r-[1px] border-l-[1px] w-[350px] '>

            <div onClick={() =>handleClickPost(note.id)}>

              <h3 className='mb-6 text-xs font-bold font-Roboto'>@{note.author}{username==note.author ? <span> [you]</span> : null}</h3>

              <p className='mb-6 font-Roboto' key={note.id}>{note.body}</p>

              <small className='font-thin text-gray-400 '>{moment(note.created_at).fromNow()}</small>

            </div>

            <div className='flex flex-row justify-between'> 

            <motion.div 
                    whileHover={{
                      scale: [0.9, 1.1, 0.9],
                      rotate: [0, 0, 270,   270, 0],
                      borderRadius: ["20%",  "50%",  "20%"],
                    }}
                className='grid w-8 h-8 transition-all ease-linear rounded-full hover:bg-slate-600 place-content-center'>
                  <Image onClick={() =>handleClickHeart(note.id)} src={note.hearted  ? smallheart :HeartIcon} className='w-6 h-6 '/>
                </motion.div>

                <motion.div
              whileHover={{
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 0, 270,   270, 0],
                borderRadius: ["20%",  "50%",  "20%"],
              }}
              className='grid w-8 h-8 text-white transition-all ease-linear rounded-full hover:bg-slate-600 place-content-center'>
                  <Image  onClick={() =>handleClickBookmark(note.id)} src={note.bookmarked  ? smallBookmarkIcon:BookmarkIcon}  className='w-6 h-6 text-white '/>
              </motion.div>

          </div>
        </motion.div>
        )
      })}

    </div>
    </main>
  )
}

export default GetNotes