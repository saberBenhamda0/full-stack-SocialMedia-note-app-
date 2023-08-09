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




function UserNote(props) {
  let router = useRouter()
  let [clickedBookmark, setClickedBookmark] = useState(false)
  let [clickedHeart, setClickedHeart] = useState(false)
  let [note, setnote] = useState({})
  let [body, setbody] = useState()
  let notedData = {
    body:body,
  }
  let username = localStorage.getItem('username')
  let auth = localStorage.getItem('access_token' )
  const formattedTime = moment(note.created_at).fromNow();

  const authHeader = {
    'Authorization': `Bearer ${auth}`
    };
  let handleSubmit  = async (e) => {


      let res = await fetch(`http://localhost:8000/api/note/${props.noteId}/`,{
       method:"GET",
       headers:{'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 Authorization: `Bearer ${auth}`
                },
     })
     let note = await res.json()
     setnote( note);
     setbody(note.body)
    }



    useEffect( () =>{
        handleSubmit()
  }, [clickedBookmark])

    useEffect( () =>{
        handleSubmit()
   }, [clickedHeart])

  const handleBoookmarkClick = () => {
    setClickedBookmark(prevState => !prevState);

  };
  const handleHeartedClick = () => {
    setClickedHeart(prevState => !prevState);
  };




  let handleClickBookmark  = async (noteId, e) => { 

    handleBoookmarkClick()
    let bookmark = await  fetch(`http://localhost:8000/api/bookmark/note/${noteId}/`,
    {method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${auth}`
     },
  }
    )

  }


  let handleClickHeart  = async (noteId, e) => { 

    handleHeartedClick()

    let heart = await fetch(`http://localhost:8000/api/heart/note/${noteId}/`,
    {method:'GET',
    headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${auth}`
   },
})

}

let UpdateNote = async (noteId) => { 

  let update = await fetch(`http://localhost:8000/api/update/note/${noteId}/`,
      {method:'PUT',
      headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${auth}`
      },
      body:JSON.stringify(notedData)

})
router.push('/home')
}




    return (
    <div className='flex flex-col justify-between mt-40 mb-10 ml-24 mr-24 '>
          <motion.div
           className='flex flex-col justify-between  shadow-lg  rounded-m hover:shadow-2xl transition-all duration-300 ease-linear hover:cursor-pointer border-solid border-gray-700 border-t-[1px] border-r-[1px] border-l-[1px] w-[1000px] h-96  mb-10 ml-24 mr-24 text-gray-300'>
            
          <div >

            <h1 className='mb-6 text-2xl font-bold font-Roboto'>@{note.author}{username==note.author ? <span> [you]</span> : null}</h1>
            <div className=''>
              <textarea key={note.id} type='text' name='body' className= "mb-6 ml-6 text-xl pb-10 align-text-top overflow-y-scroll scrollbar-hide break-all text-left text-white h-52 w-[950px] bg-custom-black-light font-Roboto" onChange={(e)=>{setbody(e.target.value)}}  value={body} />
            </div>


            </div>

            <div className='ml-5 '>
            <small className='font-thin text-gray-400 '>{moment(note.created_at).fromNow()}</small>
            </div>
            
            <div className='flex flex-row justify-between'> 
            

              <motion.div
                  onClick={() =>handleClickBookmark(note.id)}
              className='grid w-16 h-16 text-white transition-all ease-linear rounded-full hover:bg-slate-600 place-content-center'>
                  <Image   src={note.bookmarked  ? smallBookmarkIcon: BookmarkIcon }  className='w-12 h-12 text-white '/>
              </motion.div>
              <motion.button
              onClick={()=>UpdateNote(note.id)}
  
                            whileTap={{ rotate: 10, scale: 0.75, transition:1 }}
               className='h-16 mb-5 text-2xl font-bold border-2 border-solid rounded-lg text-red border-red bg-custom-black-light w-36 font-Roboto hover:bg-white hover:border-custom-black hover:border-solid hover:border-2 hover:text-black'>
                save
              </motion.button>

              
                <motion.div 
                  onClick={() =>handleClickHeart(note.id)}
                className='grid w-16 h-16 transition-all ease-linear rounded-full hover:bg-slate-600 place-content-center'>
                  <Image  src={note.hearted  ? smallheart :HeartIcon} className='w-12 h-12 '/>
                </motion.div>

          </div>
        </motion.div>
        

    </div>
    )
}

export default UserNote