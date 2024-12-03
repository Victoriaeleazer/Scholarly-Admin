import { useMediaQuery } from '@react-hook/media-query'
import React, { useEffect, useState } from 'react'
import Fab from '../../../components/Fab';
import { Add } from 'iconsax-react';
import SearchBar from '../../../components/SearchBar';

import addChatAnim from '../../../assets/lottie/add-chat.json'
import LottieWidget from '../../../components/LottieWidget';
import { Channel } from '../../../interfaces/Channel';

import { Client } from '@stomp/stompjs';
import { websocket_url } from '../../../services/api-consumer';
import { getAdminUserData, getChannels, saveChannels } from '../../../services/user-storage';
import { Link, useLocation } from 'react-router';

// This is the page where we see all the channels & chats
export default function ChannelPage() {

  const [admin, setAdmin] = useState(getAdminUserData())

  const [channels, setChannels] = useState<Channel[]>(getChannels());

  const location = useLocation();

  useEffect(()=>{

    const client = new Client({
      brokerURL: websocket_url,
      onConnect:()=>{
        console.log('Connected to channels websocket')

        client.subscribe(`/channels/${admin.id}`, (channelApiResponse)=>{
          console.log(channelApiResponse.body);

          const data = JSON.parse(channelApiResponse.body)["data"];

          // If the response gotten is an array, then we are overwriting
          // the entire list since arrays are only returned if we are fetching for
          // list of channels.
          if(Array.isArray(data)){
            const channels = data.map(channel => channel as Channel);
            setChannels(channels);
            return;
          }


          /// If it is not given as an array, then that means its a channel,
          // Hence, we make sure that any old version of this gotten channel
          // is removed and then the new one is added last (i.e overwritten and shown as latest).
          const channelData  = data as Channel;

          const newChannels : Channel[] = []; 

          for(const channel of channels){
            if(channel.id != channelData.id){
              newChannels.push(channel);
            }
          }
          newChannels.push(channelData);
          setChannels(newChannels);

        })

        /// To always load the channels
        client.publish({
          destination:`/scholarly/getChannels/${admin.id}`
        });
      },
      onStompError:()=>console.log("Stomp Error"),
      onWebSocketError:()=>console.log('Error'),

    });

    client.activate();

    return ()=>{
      client.deactivate().then(()=>{});
    };


  }, [])

  // To constantly save channels when they are opened
  useEffect(()=>{
    const sortedChannels = channels.sort((a,b)=> new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime());
    saveChannels(sortedChannels)
  }, [channels])

  


  function noChatsLayout(){
    return <div className='flex flex-col gap-3 items-center justify-center text-center flex-1 w-full'>

      <LottieWidget lottieAnimation={addChatAnim} className='w-[200px] h-[200px]'/>

      <p>You don't have a chat yet.<br />Create a channel or chat with an admin</p>

    </div>
  }

  function chatsLayout(){
    return <div className='flex flex-col items-center justify-center text-center h-fit overflow-x-hidden overflow-y-scroll scholarly-scrollbar w-full'>
      {channels.map(channel => (
        <Link to={channel.id} replace={!location.pathname.endsWith('channels')} className={`w-full flex bg-transparent text-white border-white border-b border-opacity-10 last:border-b-0 gap-5 items-center py-5 px-4 justify-center ${location.pathname.includes(channel.id)? 'bg-white bg-opacity-5' : ''}`}>
          <div className='w-[45px] h-[45px] rounded-circle overflow-hidden'>
            {channel.channelProfile && <img src={channel.channelProfile} alt='Channel Photo' className='w-full h-full object-cover' />}
            {!channel.channelProfile && <div className='w-full h-full flex items-center justify-center font-[Raleway] bg-purple font-bold text-[25px] text-center'>{channel.channelName.charAt(0)}</div>}
          </div>

          <div className='flex flex-1 flex-col items-start gap-0.5 justify-center'>
            <p>{channel.channelName}</p>
            <p className='text-secondary text-[12px] font-[Raleway]'>{channel.latestMessage.senderId !== admin.id && channel.latestMessage.messageType === 'chat' && <span className='font-semibold'>Someone: </span>}{channel.latestMessage.message ?? "bleh"}</p>
          </div>

          {channel.unreadMessages !== 0 && <div className='rounded-circle min-w-7 min-h-7 flex items-center justify-center text-center bg-purple font-extrabold'>{channel.unreadMessages}</div>}
        </Link>
      ))}
    </div>
  }

  const isPhone = !useMediaQuery('only screen and (min-width:768px)');
  return (
    <div className={`${isPhone? 'w-full':'w-[450px]'} h-full select-none rounded-[18px] pb-0 bg-tertiary flex flex-col relative`}>
      <div className='w-full sticky h-fit top z-[1] rounded-t-[18px] px-6 py-4 bg-tertiary flex flex-col gap-3'>
        <h1 className='text-[25px] font-bold'>Chats</h1>
        <SearchBar />
      </div>

      {channels.length === 0 && noChatsLayout()}
      {channels.length !== 0 && chatsLayout()}
      
      <Fab className='absolute shadow-sm bottom-5 right-5'>
        <Add size={25} />
      </Fab>
    </div>
  )
}
