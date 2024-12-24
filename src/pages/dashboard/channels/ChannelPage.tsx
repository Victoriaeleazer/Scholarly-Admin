import { useMediaQuery } from '@react-hook/media-query'
import React, { useEffect, useReducer, useState } from 'react'
import Fab from '../../../components/Fab';
import { Add } from 'iconsax-react';
import SearchBar from '../../../components/SearchBar';

import addChatAnim from '../../../assets/lottie/add-chat.json'
import LottieWidget from '../../../components/LottieWidget';
import { Channel } from '../../../interfaces/Channel';
import {getAdminUserData, getChannels} from '../../../services/user-storage';
import { Link, useLocation } from 'react-router';
import { useAppSelector } from '../../../hooks/redux-hook';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import { createChannel } from '../../../services/api-consumer';
import { toast } from 'sonner';
import {ApiResponse} from '../../../interfaces/ApiResponse';
import { useMutation } from '@tanstack/react-query';


// This is the page where we see all the channels & chats
export default function ChannelPage() {

  const [admin, setAdmin] = useState(getAdminUserData())

  const location = useLocation();


  const channels = useAppSelector((state)=> state.channels.value)

  const [popup, showPopup] = useState(false)

  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(getChannels());

  const [filter, setFilter] = useState('');

  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDesc] = useState('');
  const [channelType, setChannelType] = useState<'announcement' | 'qa' | 'project'>('announcement');


  


  useEffect(()=>{

    const filtered = channels.filter(channel => channel.channelName.toLowerCase().includes(filter.toLowerCase()));
    setFilteredChannels(filtered);

  }, [channels, filter])

  function noChatsLayout(){
    return <div className='flex flex-col gap-3 items-center justify-center text-center flex-1 w-full'>

      <LottieWidget lottieAnimation={addChatAnim} className='w-[200px] h-[200px]'/>

      <p>
        {filter.trim().length === 0 && "You don't have a chat yet.\n\nCreate a channel or chat with an admin"}
        {filter.trim().length !== 0 && <p>There were no search results for '<span className='font-bold'>{filter.trim()}</span>'.</p>}
      </p>

    </div>
  }

  function chatsLayout(){
    return <div className='flex flex-col items-center text-center h-fit flex-1 overflow-x-hidden overflow-y-scroll scholarly-scrollbar w-full'>
      {filteredChannels.map(channel => {
        const inChat = location.pathname.includes(`channels/${channel.id}`);
        
        return (
          <Link to={channel.id} key={channel.id} replace={!location.pathname.endsWith('channels')} className={`w-full flex bg-transparent text-white border-white border-b border-opacity-10 last:border-b-0 gap-5 items-center py-5 px-4 justify-center ${location.pathname.includes(channel.id)? 'bg-white bg-opacity-5' : ''}`}>
          <div className='w-[45px] h-[45px] rounded-circle overflow-hidden'>
            {channel.channelProfile && <img src={channel.channelProfile} alt='Channel Photo' className='w-full h-full object-cover' />}
            {!channel.channelProfile && <div className='w-full h-full flex items-center justify-center font-[Raleway] bg-purple font-bold text-[25px] text-center'>{channel.channelName.charAt(0)}</div>}
          </div>

          <div className='flex flex-1 flex-col items-start gap-0.5 justify-center overflow-hidden'>
            <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{channel.channelName}</p>
            <p className={`${channel.unreadMessages > 0 && !inChat? 'text-blue font-medium':'text-secondary'} text-[12px] font-[Raleway] whitespace-nowrap text-ellipsis overflow-hidden`}>{channel.latestMessage.senderId !== admin.id && channel.latestMessage.messageType === 'chat' && <span className='font-bold'>{channel.members.find(member => channel.latestMessage.senderId === member.id)?.firstName ?? "Someone"}: </span>}{channel.latestMessage.message ?? "bleh"}</p>
          </div>

          {channel.unreadMessages !== 0 && !inChat && <div className='rounded-circle min-w-7 min-h-7 flex items-center justify-center text-center text-[11px] bg-purple font-extrabold'>{channel.unreadMessages}</div>}
        </Link>
        );
      })}
    </div>
  }

  async function create(channel: Channel | any){
    const response = await createChannel(channel, admin.id);
    
    if(response.status !== 200){
      throw new Error((response.data as ApiResponse).message);
    }

    return response.data as ApiResponse;
  }

  const channelMutation = useMutation({
    mutationFn: create,
    onSuccess: (data)=>{
      toast.success(data.message)
      showPopup(false)
    },
    onError: (data)=>{
      toast.error(data.message);
    }
  })

  const isPhone = !useMediaQuery('only screen and (min-width:768px)');
  
  return (
    <div className={`${isPhone? 'w-full':'w-[450px]'} h-full select-none rounded-[18px] pb-0 bg-tertiary relative flex flex-col`}>
      <div className='w-full h-fit rounded-t-[18px] px-6 py-4 bg-tertiary flex flex-col gap-3'>
        <h1 className='text-[25px] font-bold'>Chats</h1>
        <SearchBar onChange={(v)=> setFilter(v.trim())} />
      </div>

      {filteredChannels.length === 0 && noChatsLayout()}
      {filteredChannels.length !== 0 && chatsLayout()}

      <Dialog
        show={popup}
        cancelable={false}
        onClose={()=>showPopup(false)}
        className='flex flex-col items-center justify-center gap-4 text-left w-[400px]'>
        <p className='text-white mb-3 text-[23px] font-semibold self-start'>Create Channel</p>
        <form className='flex flex-col items-center justify-center gap-4 text-left w-full'
        onSubmit={(e)=>{
          e.preventDefault();
          channelMutation.mutate({channelName, channelDescription, channelType});
        }}>
          <input onChange={(e)=>setChannelName(e.target.value.trim())} required placeholder='Enter Channel Name' multiple={false} className='w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none' />
          <textarea onChange={(e)=>setChannelDesc(e.target.value.trim())} required placeholder='Enter Channel Description' rows={5} draggable={false} className='w-full resize-none bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none scholarly-scrollbar purple-scrollbar' />
          <select onChange={(e)=>setChannelType(e.target.value.trim() as 'announcement' | 'qa' | 'project')} required multiple={false} className='w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none'>
            <option className='bg-black text-white' value={'announcement'}>Announcement</option>
            <option className='bg-black text-white' value={'project'}>Project</option>
            <option className='bg-black text-white' value={'qa'}>QA</option>

          </select>
          <Button loading={channelMutation.isPending} title='Create' type='submit' className='max-h-[55px]' />
        </form>

      </Dialog>
      
      <Fab onClick={()=>showPopup(true)} className='absolute shadow-sm bottom-5 right-5'>
        <Add size={25} />
      </Fab>
    </div>
  )
}
