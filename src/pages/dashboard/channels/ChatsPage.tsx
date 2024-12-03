import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getChannel } from '../../../services/user-storage';
import { toast } from 'sonner';
import { Channel } from '../../../interfaces/Channel';

// Where chatting is taking place.
export default function ChatsPage() {
  const {channelId} = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState<Channel>();

  function updateChannel(){
    const gottenChannel = getChannel(channelId!);

    if(gottenChannel){
      setChannel(gottenChannel);
      return;
    }
    toast.error("This channel seems to not be found");
    navigate(-1);


  }

  useEffect(()=>{
    updateChannel();
    // const interval = setInterval(()=>{
    //   updateChannel();
    // }, 2000);

    // return ()=> clearInterval(interval)
  },[])




  return (
    <div className='flex flex-col h-full w-full bg-tertiary text-white border border-tertiary rounded-[18px]'>
      {/* Header */}
      <div className='w-full px-8 py-4 bg-transparent flex gap-7 items-center justify-center'>
        <div className='w-[45px] h-[45px] rounded-circle overflow-hidden'>
          <img src={channel?.channelProfile} className='w-full h-full rounded-circle object-cover' />
        </div>
        <div className='flex flex-col gap-0 flex-1 '>
          <p className='text-white font-bold text-[16px]'>{channel?.channelName}</p>
          <p className='text-secondary font-[Raleway]'>{channel?.members.length} Member{channel?.members.length ===1?'':'s'}</p>
        </div>
      </div>

      {/* Body */}
      <div className='flex flex-1 flex-col bg-black'></div>

      {/* Footer */}
      <div className='w-full px-8 py-4 bg-transparent flex gap-7 items-center justify-center'>
        
      </div>
    </div>
  )
}
