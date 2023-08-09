"use client"
import '../globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import SideBarIcons from '@/components/sidebaricons';
import LogoutIcon from 'public/icons/logout.svg';
import BookmarkIcon from 'public/icons/bookmark.svg';
import HeartIconfrom from 'public/icons/heart.svg';
import setting from 'public/icons/settings.svg'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';


const inter = Inter({ subsets: ['latin'] })
export const  authContext = createContext()


export default function RootLayout({ children }) {


    let router = useRouter()
    let handlelogout = () => {
        localStorage.clear()
        router.push('/')
    }


  //for saving jwt in local storage then in authorizatio9n header -------------------------
  const accessToken = localStorage.getItem('access_token');
  const authHeader = {
  'Authorization': `Bearer ${accessToken}`
  };
  //-----------------------------------------------------------------------------------------------

  //for usecontext--------------------------------------------------------
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [auth, setAuth] = useState(false)
  // ----------------------------------------------------------

  useEffect(() => {localStorage.getItem('access_token') ? setAuth(true) : null},[])

  return (
    <html lang="en">
        <authContext.Provider value={ {username, setUsername, password, setPassword, auth, setAuth,accessToken, authHeader,} }>


        <body className='bg-custom-black-light'>

        <main
        className="flex flex-row justify-between w-screen h-full shadow-2xl bg-custom-black-light">
        <header className="fixed grid w-screen h-24 border-b-2 shadow-2xl bg-custom-black place-items-center border-custom-black-dark ">
        <h1 
        onClick={()=>router.push('/home')}
        className="block font-semibold tracking-wide text-white transition-all duration-100 ease-linear hover:text-blue-300 hover:cursor-pointer">
          YOUR NEW FAV NOTE APP
        </h1>
        <svg className="absolute w-12 h-12 text-white transition-all duration-100 ease-linear right-2 top-2 hover:text-blue-300 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 15s2-1 4 0 4-1 4-1 2-1 4 0 4 1 4 1" />
          <path d="M5 3v12h14V3H5zm2 8h10M9 7h6M9 11h6" />
        </svg>
        <div className="fixed top-0 left-0 flex flex-col w-16 h-screen m-0 border-r-2 shadow-2xl bg-custom-black border-custom-black-dark">
              <SideBarIcons onClick={()=>router.push('setting')} title='setting' icons={setting}/>
              <SideBarIcons onClick={()=>router.push('loved')} title='loved'icons={HeartIconfrom} />
              <SideBarIcons onClick={()=>router.push('bookmark')} title ='bookmark'icons={BookmarkIcon} />
              <SideBarIcons onClick={handlelogout} title='logout'icons={LogoutIcon}/>
  
        </div>
        </header>
        </main>
        {children}

        </body>
        </authContext.Provider>
     </html>
)
}


