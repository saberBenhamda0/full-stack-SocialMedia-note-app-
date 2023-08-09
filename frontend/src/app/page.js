"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './globals.css';
import {heroSectionImage} from '../../public/icons/removal 1.svg'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import setting from 'public/icons/settings.svg'



const Home = () =>{



  const router = useRouter();

  const logoSrc = '/icons/logo.png';



  return (
      <div  className=" w-screen h-[2500px] bg-custom-black relative bg-cover bg-center ">

        <nav className="w-screen h-[120px] bg-black relative flex items-center">
          <motion.button 
          whileHover={{ scale:1.1}}
          whileTap={{ scale:0.9}}
          onClick={() => {router.push("/login")}}
          className='w-[152px] h-[60px] bg-stone-300 rounded-2xl absolute right-12 text-black text-[30px] font-bold leading-10 tracking-wide hover:text-stone-300 hover:bg-black hover:border-solid hover:border-stone-300 hover:border-4  hover:cursor-pointer transition-all duration-100 ease-linear active:opacity-60'> Login</motion.button>
          <motion.button
                  whileHover={{ scale:1.1}}
                  whileTap={{ scale:0.9}}
                  onClick={() => {router.push("/signup")}}

          className='w-[152px] h-[60px] bg-black rounded-2xl absolute right-60 text-stone-300 text-[30px] font-bold leading-10 tracking-wide hover:text-black hover:bg-stone-300 hover:border-solid hover:border-stone-300 hover:border-4  hover:cursor-pointer transition-all duration-100 ease-linear active:opacity-60'> SignUp</motion.button>
          <Image className=" w-[350px] h-[55px] absolute left-40  " src={logoSrc} width={100} height={100} alt='logo' />
        </nav>

        <div className='h-[700px] w-screen flex justify-between items-center '>

          <div className="w-[700px] h-[484px] text-center text-white text-[70px] font-bold leading-[70px] tracking-widest pl-24">Share notes effortlessly. Connect with a community of knowledge-seekers</div>
          <div className='grid place-content-center'>
            <img className=" w-[650px] h-[766px] pr-32" src='/icons/removal 1.svg' width={100} height={100} alt='heroSectionlogo' />
          </div>
        </div>

        <div className=' h-[300px] w-screen grid place-content-center '>
          <div className="w-screen h-[200px] text-center text-white text-[70px] font-bold leading-[70px] tracking-wide"> Welcome to our social media app for note-sharing.</div>
        </div>

        <div className="w-screen h-[820px] flex flex-col items-center pt-5">
          <div className="w-screen h-[362px] flex flex-col items-center">
            <div className=" w-screen2 h-[90px]  text-center text-white text-[60px] font-bold leading-10 tracking-wider">More Than Just A Note App<br/></div>
            <div className="w-9/12 h-[230px]  text-center text-white text-[40px] font-medium leading-10 tracking-wider"> Experience the convenience of secure note-sharing while forging meaningful connections with like-minded individuals. Expand your network, engage in insightful discussions, and unlock new opportunities for growth and collaboration</div>
          </div>
          <img className="w-[754px] h-[530px]" src="/icons/Saly-31.svg" />
        </div>
        <div className=" w-screen h-[400px]">

          <div className="w-screen h-[200px] pt-14 text-center text-white text-[70px] font-bold leading-[70px] tracking-wide"> Contact Me
          </div>

          <div className='flex items-center justify-between pr-72 pl-72 pt-52'>
            <button className='w-[200px] h-[60px] bg-stone-300 rounded-2xl  text-black text-[30px] font-bold leading-10 tracking-wide hover:text-stone-300 hover:bg-black hover:border-solid hover:border-stone-300 hover:border-4  hover:cursor-pointer transition-all duration-100 ease-linear active:opacity-60 '>linkedin</button>
            <button className='w-[200px] h-[60px] bg-stone-300 rounded-2xl  text-black text-[30px] font-bold leading-10 tracking-wide hover:text-stone-300 hover:bg-black hover:border-solid hover:border-stone-300 hover:border-4  hover:cursor-pointer transition-all duration-100 ease-linear active:opacity-60'>gmail</button>
          </div>
        </div>

        <div className='absolute top-[250px] right-[-150px] w-[250px] h-[450px] rounded-full blur-3xl bg-neutral-600 opacity-50'></div>
        <div className='absolute top-0 left-[-250px] w-[450px] h-[450px] rounded-full blur-3xl bg-purple-500 opacity-50'></div>
      </div>

  )
}

export default Home
