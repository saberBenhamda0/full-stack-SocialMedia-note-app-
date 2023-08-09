"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { authContext } from '../app/layout'
import { useContext } from 'react';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/navigation';


const ActiveSetting = () => {
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
        <div className=' w-[800px] text-lg border-2 border-custom-black shadow-xl border-solid h-[500px] mt-20 flex flex-col justify-between items-center '>
            <input onChange={(e) =>(setUsername(e.target.value))} type='text' className='w-[506px] h-[78px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold mt-10' placeholder='username' />
            <input  onChange={(e) =>(setPassword(e.target.value))} type='password' className='w-[506px] h-[78px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold' placeholder='password' />
            <input  onChange={(e) =>(setConfirmPassword(e.target.value))} type='password' className='w-[506px] h-[78px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold mb-14' placeholder='confirme password' />
            <motion.button 
            whileHover={{ scale:1.1}}
            onClick={handleSubmite}
            whileTap={{ scale:0.9}}
            className='w-[152px] h-[60px] bg-stone-300 rounded-2xl text-black text-[30px] font-bold leading-10 tracking-wide hover:text-stone-300 hover:bg-black hover:border-solid hover:border-stone-300 hover:border-4  hover:cursor-pointer transition-all duration-100 ease-linear active:opacity-60 mb-10'> Save</motion.button>
            {password == confirmepassword ? null : <small className="text-red-600">password is not matched</small>}
        </div>
    </main>
  )
}

export default ActiveSetting