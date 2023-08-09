"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useState, useEffect, createContext } from 'react'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const  authContext = createContext()


export default function RootLayout({ children }) {

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
        <body className={inter.className}>{children}</body>
      </authContext.Provider>
    </html>
  )
}
