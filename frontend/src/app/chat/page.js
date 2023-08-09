"use client"
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';


const LobbyPage =  () => {
  let [message, setMessage] = useState('')
  let [messages, setMessages] = useState([])
  let sentMessage = {
    'message':message
  }
  let handleGettingMessages = async () => {
    let res2 = await fetch('http://localhost:8000/api/messages/',{
      method:'GET',
      headers:{'Content-Type': 'application/json',
      'Accept': 'application/json'   
    },})
    let data = await res2.json()
    setMessages(data)

  }

   let handleAddingMessage = async (e) => { 
    e.preventDefault()
    let res  = await fetch('http://localhost:8000/api/addMessages/',{
      method:'POST',
      headers:{'Content-Type': 'application/json',
      'Accept': 'application/json'   
    },
      body:JSON.stringify(sentMessage),
    })
    let message = e.target.message.value;
    chatSocket.send(JSON.stringify({
      'message': message
    }));

  } 

  useEffect(  ()  => {     

    handleGettingMessages()

    const url = `ws://localhost:8000/ws/socket-server/`;
    const chatSocket = new WebSocket(url);

    chatSocket.onmessage = function async (e) {
      let username = localStorage.getItem('username')

      let data = JSON.parse(e.data);
      chatSocket.send(JSON.stringify({
        'message': message
      }));
    
      let messageSocket = message;
      chatSocket.send(JSON.stringify({
        'message': messageSocket
      }));
   
      if (data.type === 'chat') {
        let messagesSocket = document.getElementById('messages');
        messagesSocket.insertAdjacentHTML(
          'beforeend',
          `
          <div'>
              <div className='block ml-6 text-white font-Roboto'>${data.message}</div>
         </div>
          `
        );
      }
    };


    // Clean up the WebSocket connection when the component unmounts
    return () => {
      chatSocket.close();
    };
  }, []);

  return (
    <div className='relative flex flex-row w-full h-full border-2 border-solid border-slate-600 bg-custom-black-light'>
      <div className='fixed bottom-0 z-10 grid h-16 left-56 place-content-center '>
        <h1>Lets chat!</h1>
        <form className='w-screen h-12 ' onSubmit={()=>handleAddingMessage} id="form">
          <input className='bg-white ' type="text" value={message} onChange={(e) =>setMessage(e.target.value)} name="message" />
          <button type='submit'>submit</button>
        </form>
      </div>
      <div className='z-0 bg-custom-black-dark'>

        {messages.map((ServerMessage) => {
          return(
            <div key={ServerMessage.id} className='relative h-16 mb-2 border-2 border-gray-500'>
              <small className='block text-gray-400 font-Roboto'>@{ServerMessage.author}</small>
              <div className='block ml-6 text-white font-Roboto'>{ServerMessage.content}</div>
              <small className='absolute right-0 z-0 text-gray-400 font-Roboto'>{ moment(ServerMessage.timestamp).fromNow()}</small>
          </div>
        )})}
      </div>
      <div  className='relative mb-2 bg-white border-2 border-gray-500 h-scteen' id='messages'></div>

    </div>
  );
};

export default LobbyPage;
