import React from 'react'
import UserNote from '@/components/getNote'
const page = ({params}) => {


  return (
    <main className='h-screen w-sceen bg-custom-black-light'>
    <UserNote noteId={params.noteId} />
    <div>{params.noteId}</div>
    </main>
  )
}

export default page