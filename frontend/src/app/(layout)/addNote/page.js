"use client"
import React, { useState } from 'react'
import UserNote from '@/components/getNote'
import { motion } from 'framer-motion'

const addNote = () => {
  const [body, setbody] = useState("")
  const CreateNote = () => {
    console.log('here')
    console.log(body)
  }

  return (
    <div className='grid w-screen h-screen place-content-center'>
      <div className='border-2 border-gray-700 border-solid shadow-2xl'>
        <textarea placeholder='write anything here'  type='text' name='body' className= "mb-6  ml-6 text-xl pb-10 align-text-top overflow-y-scroll scrollbar-hide break-all text-left text-white h-52 w-[950px] bg-custom-black-light font-Roboto" onChange={(e)=>{setbody(e.target.value)}}  value={body} />
        <div className='grid shadow-2xl place-content-center'>
              <motion.button
                onClick={()=>CreateNote()}
    
                              whileTap={{ rotate: 10, scale: 0.75, transition:1 }}
                className='h-16 mb-5 text-2xl font-bold text-white border-2 border-solid rounded-lg text-red border-red bg-custom-black-light w-36 font-Roboto hover:bg-white hover:border-custom-black hover:border-solid hover:border-2 hover:text-black'>
                  save
                </motion.button>
          </div>
        </div>
    </div>  
    )
}

export default addNote