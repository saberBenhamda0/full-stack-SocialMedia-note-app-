"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { authContext } from '../layout';
import { useContext } from 'react';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/navigation';
import ActiveSetting from '@/components/activesetting';


const page = () => {
    let router = useRouter()
    
    let { username, setUsername, password, setPassword, auth, setAuth } = useContext(authContext);
    let [confirmepassword, setConfirmPassword] = useState('')
    const accessToken = localStorage.getItem('access_token');
    let decodedToken = jwt_decode(accessToken);
    let userId = decodedToken.user_id

    let formData = { 
        username:username,
        password:password,
        password2:confirmepassword,
        userId:userId
    }

    let formData2 = {
        username:username,
        password:password
      }

    let handleSubmite = async (e) =>{
        e.preventDefault()
        console.log(formData)
        let res = await fetch('http://localhost:8000/api/updateUser/',{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${accessToken}`

                    },
            body:JSON.stringify(formData)
          })


          let data = await res.json()
        localStorage.clear()            
            e.preventDefault()
             let res2 = await fetch('http://localhost:8000/api/token/',{
              method:"POST",
              headers:{'Content-Type': 'application/json',
                        'Accept': 'application/json'   
                      },
              body:JSON.stringify(formData2)
            })
            let data2 = await res2.json()
            if (res.ok) {
        
              localStorage.clear()
              localStorage.setItem('access_token', data2.access )
              localStorage.setItem('refresh_token', data2.refresh);
              localStorage.setItem('username' , username)
              localStorage.setItem('user_id' , userId)
              
          }
        
        }    
      
    
    

  return (
    <main className='grid w-screen h-screen place-content-center'>
        <ActiveSetting/>
    </main>
  )
}

export default page