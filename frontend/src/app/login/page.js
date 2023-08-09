"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { authContext } from '../layout';


export default function Home() {

  let { username, setUsername, password, setPassword, auth, setAuth } = useContext(authContext);
  useEffect(() => {localStorage.getItem('access_token') ? setAuth(true) : null},[])

  let formdata = {
                  username:username,
                  password:password
                }

  const router = useRouter()


  let handleSubmit  = async (e) => {

    e.preventDefault()
     let res = await fetch('http://localhost:8000/api/token/',{
      method:"POST",
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'   
              },
      body:JSON.stringify(formdata)
    })
    let data = await res.json()
    if (res.ok) {

      localStorage.clear()
      localStorage.setItem('access_token', data.access )
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('username' , username)
      router.push('/home')
      
  }

}

  return(
  <div className= " w-screen h-[1000px] bg-[url('/icons/6057485.jpg')] bg-cover bg-no-repeat">
        <div className='bg-black  opacity-50 w-screen h-[1000px] grid place-content-center'>
        <div className="w-[600px] h-[700px] bg-slate-600 bg-opacity-30  rounded-2xl shadow flex flex-col items-center">
            <div className="w-[364px] h-[104px] opacity-60 text-center text-white text-[50px] pt-6 font-extrabold">Login in </div>
            <div className="w-[466px] h-[138px] opacity-60 text-center text-white text-[25px] pt-6 font-normal">Hey, Enter your detail to sign in to your account</div>
                <div className='p-6'>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} name='username' className="w-[506px] h-[78px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold" placeholder='username' type='text'></input>
                </div>
                <div  className='p-6'>
                <input value={password}  onChange={(e)=>{setPassword(e.target.value)}} name='password' className="w-[506px] h-[78px] pt-6 pb-6 bg-zinc-500 rounded-xl placeholder:text-start placeholder:p-4 placeholder:font-Roboto placeholder:text-white placeholder:text-[20px] placeholder:font-bold focus:text-start focus:p-4 focus:font-Roboto focus:text-white focus:text-[20px] focus:font-bold" placeholder='password' type='password'></input>
                </div>
                <div className="w-[500px] h-16 opacity-60 text-start text-white text-[20px] font-bold flex justify-start">Having trouble in sign in ?</div>
            <button onClick={handleSubmit} className="w-[506px] h-[78px] bg-slate-700 hover:bg-custom-black-dark active:opacity-60 rounded-xl text-white text-[20px] font-bold">login</button>

        </div>

  </div>
  </div>
  )
}
