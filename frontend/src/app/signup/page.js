"use client"
import React from 'react'
import { useContext } from 'react';
import { authContext } from '../layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter()

    let { username, setUsername, password, setPassword, auth, setAuth } = useContext(authContext);
    let [confirmepassword, setConfirmPassword] = useState('')
    let formdata = {
        username:username,
        password:password,
        password2:confirmepassword
      }

    let handleSubmite = async (e) =>{
        e.preventDefault()
        let res = await fetch('http://localhost:8000/api/signup/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'   
                    },
            body:JSON.stringify(formdata)
          })


          console.log(formdata)
          let data = await res.json()
          if (res.ok) {
            router.push('/login')
            
        }
      
    }


    return(
        <div className= " w-screen h-[1000px] bg-[url('/icons/6057485.jpg')] bg-cover bg-no-repeat">
              <div className='bg-black  opacity-50 w-screen h-[1000px] grid place-content-center'>
              <div className="w-[600px] h-[700px] bg-slate-600 bg-opacity-30  rounded-2xl shadow flex flex-col items-center">
                  <div className="w-[364px] h-[104px] opacity-60 text-center text-white text-[50px] pt-6 font-extrabold">Sign Up </div>
                  <div className="w-[466px] h-[138px] opacity-60 text-center text-white text-[25px] pt-6 font-normal">Hey, Enter your detail to sign Up </div>
                      <input value={username} onChange={(e)=>setUsername(e.target.value)} name='username' className="w-[506px] h-[85px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold" placeholder='username' type='text'></input>
                      <input value={password}  onChange={(e)=>{setPassword(e.target.value)}} name='password' className="w-[506px] h-[85px] mt-6 mb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold" placeholder='password' type='password'></input>
                      <input value={confirmepassword}  onChange={(e)=>{setConfirmPassword(e.target.value)}} name='confirmepassword' className="w-[506px] h-[85px] mb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold" placeholder='confirmepassword' type='password'></input>
                  <button onClick={handleSubmite}  className="w-[506px] h-[78px] mb-8 bg-slate-700 hover:bg-custom-black-dark active:opacity-60 rounded-xl text-white text-[20px] font-bold">SignUp</button>
      
              </div>
      
        </div>
        </div>
        )  
}

export default page