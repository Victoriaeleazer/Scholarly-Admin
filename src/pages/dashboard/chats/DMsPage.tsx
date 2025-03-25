import { useMediaQuery } from '@react-hook/media-query'
import React, { ReactNode, useEffect, useReducer, useState } from 'react'
import Fab from '../../../components/Fab';
import { Add, Edit, ExportSquare, Message, Message2, Messages, MessageText1, People, User } from 'iconsax-react';
import SearchBar from '../../../components/SearchBar';

import addChatAnim from '../../../assets/lottie/add-chat.json'
import LottieWidget from '../../../components/LottieWidget';
import { Channel } from '../../../interfaces/Channel';
import {getAdminUserData, getChannels} from '../../../services/user-storage';
import { data, Link, useLocation, useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../../../hooks/redux-hook';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import { createChannel, searchUser, startChat } from '../../../services/api-consumer';
import { toast } from 'sonner';
import {ApiResponse} from '../../../interfaces/ApiResponse';
import { useMutation } from '@tanstack/react-query';
import { useAdmin } from '../../../provider/AdminProvider';
import { useDirectMessages } from '../../../provider/DirectMessagesProvider';
import { DirectMessage } from '../../../interfaces/DirectMessage';
import { Member } from '../../../interfaces/Member';
import { FaSpinner } from 'react-icons/fa6';
import { TypingIndicatorProvider } from '../../../provider/TypingIndicatorProvider';
import DMWidget from './DMWidget';


// This is the page where we see all the channels & chats
export default function DMsPage() {

  const {admin: adminOrNull} = useAdmin();
  const admin = adminOrNull!;

  const {dmId: openedChatId} = useParams();

  const location = useLocation();
  const navigate = useNavigate();


  const {dms} = useDirectMessages()

  const [popup, showPopup] = useState(false)

  const [filteredDMs, setFilteredDMs] = useState<DirectMessage[]>(dms);

  const [filter, setFilter] = useState('');

  const [trayOpen, setTrayOpen] = useState(false);

  const [isAddingUser, setAddingUser] = useState(false)
  const [searchedUsers, setSearchedUsers] = useState<Member[]>([])

  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDesc] = useState('');
  const [channelType, setChannelType] = useState<'announcement' | 'qa' | 'project' | ''>('');


  


  useEffect(()=>{

    const filtered = dms.filter(dm => (dm.name ?? "").toLowerCase().includes(filter.toLowerCase()));
    setFilteredDMs(filtered);

  }, [dms, filter])

  function noChatsLayout(){
    return <div className='flex flex-col gap-3 items-center justify-center text-center flex-1 w-full'>

      <LottieWidget lottieAnimation={addChatAnim} className='w-[200px] h-[200px]'/>

      <p className='font-[200]'>
        {filter.trim().length === 0 && "You don't have a chat yet.\n\nStart a chat"}
        {filter.trim().length !== 0 && <p>There were no search results for '<span className='font-bold'>{filter.trim()}</span>'.</p>}
      </p>

    </div>
  }

  function chatsLayout(){
    return <div className='flex flex-col items-center text-center h-fit flex-1 overflow-x-hidden overflow-y-scroll scholarly-scrollbar w-full'>
      {filteredDMs.map(dm => (
        <TypingIndicatorProvider dmId={dm.id}>
          <DMWidget dm={dm} />
        </TypingIndicatorProvider>
      ))}
    </div>
  }

  const noResults = ()=>(
    <div className='w-full h-[60vh] flex flex-col font-[200] gap-3 items-center justify-center text-center'>
      <LottieWidget lottieAnimation={addChatAnim} className='w-[200px] h-[200px]'/>
      <p>No users were found.</p>
    </div>
  )

  const results = ()=>(
    <div className='w-full h-[60vh] flex flex-col font-[200] gap-2 text-center overflow-y-scroll scholarly-scrollbar purple-scrollbar'>
      {searchedUsers.map((user, index) => {

        return <div key={index} className='w-full flex items-center py-4 px-3 text-[15px] text-white border-white border-b border-opacity-10 last:border-b-0 gap-5'>
            <div className='w-[42px] h-[42px] rounded-circle overflow-hidden'>
              {user.profile && <img src={user.profile} alt='Channel Photo' className='w-full h-full object-cover' />}
              {!user.profile&& <div className='w-full h-full flex items-center justify-center open-sans font-medium text-[15px] text-center' style={{backgroundColor:user.color}}>{(user.firstName + " " + user.lastName).trim().split(' ').map(name=> name.charAt(0).toUpperCase()).slice(0, Math.min(2, (user.firstName + " " + user.lastName).split(' ').length))}</div>}
            </div>
            <div className='flex flex-1 flex-col items-start gap-0.5 justify-center overflow-hidden'>
              <p className='whitespace-nowrap text-ellipsis overflow-hidden font-medium'>{(user.firstName + " " + user.lastName).trim()}</p>
              <p className={`text-secondary text-[12px] font-[Raleway] font-normal whitespace-nowrap text-ellipsis overflow-hidden`}>{user.role}</p>
            </div>

            <div title={`Message ${user.firstName}`} className='text-secondary cursor-pointer mr-2'>
              {!startChatMutation.isPending  && <Messages size={24} onClick={()=> startChatMutation.mutate({user})} />}
              {startChatMutation.isPending && <FaSpinner size={24} className='animate-spin'  />}
            </div>

            <div title={`View Profile`} className='text-secondary cursor-pointer'>
              <ExportSquare size={20} />
            </div>
          </div>
      })}
    </div>
  ) 

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

  const searchUserMutation = useMutation({
    mutationFn: async ({name} : {name: string})=>{
      const response = await searchUser(name);
      console.log(response)
      if(response.status >= 300){
        throw Error((response.data as ApiResponse).message);
      }

      return (response.data as ApiResponse).data as Member[]
    },
    onSuccess: (data)=>{
      // Only show users that are not already on your DMs
      setSearchedUsers(data.filter(user => user.id !== admin.id && dms.every(dm=> dm.recipients.every(recipient => user.id !== recipient.id))));
    },
    onError: ({message})=>{
      toast.error(message);
    }
  })

  const startChatMutation = useMutation({
    mutationFn: async({user}: {user: Member})=>{
      const response = await startChat(user.id);
      console.log(response)
      if(response.status >= 300){
        throw Error((response.data as ApiResponse).message);
      }

      return (response.data as ApiResponse).data;
    },
    onError: ({message})=>{
      toast.error("Unable to start chat", {description: message});
    },
    onSuccess: (_, {user})=>{
      toast.success(`Added ${user.firstName}`, {description: "Start chatting with them now"})
      setAddingUser(false);

    }
  })

  const isPhone = !useMediaQuery('only screen and (min-width:768px)');
  
  return (
    <div onClick={()=>{
      if(!trayOpen) return;

      setTrayOpen(false)
    }} className={`${isPhone? 'w-full':'w-[450px]'} h-full select-none rounded-[18px] pb-0 bg-tertiary relative overflow-hidden flex flex-col`}>
      <div className='w-full h-fit rounded-t-[18px] px-6 py-4 bg-tertiary flex flex-col gap-3'>
        <h1 className='text-[25px] font-bold'>Chats</h1>
        <SearchBar onChange={(v)=> setFilter(v.trim())} />
      </div>

      {filteredDMs.length === 0 && noChatsLayout()}
      {filteredDMs.length !== 0 && chatsLayout()}

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
          <select onChange={(e)=>setChannelType(e.target.value.trim() as 'announcement' | 'qa' | 'project')} required multiple={false} className={`w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary ${channelType === ''? 'text-secondary' : 'text-white'} focus:outline-none`}>
            <option className='bg-black text-secondary' value={''}>Select Type</option>
            <option className='bg-black text-white' value={'announcement'}>Announcement</option>
            <option className='bg-black text-white' value={'project'}>Project</option>
            <option className='bg-black text-white' value={'qa'}>QA</option>

          </select>
          <Button loading={channelMutation.isPending} title='Create' type='submit' className='max-h-[55px]' />
        </form>

      </Dialog>

      {/* Dialog to search user to start chat with */}
      <Dialog
      show={isAddingUser}
      onClose={()=>setAddingUser(false)}      
      className='flex flex-col items-center justify-center gap-4 text-left min-w-[400px] w-full max-w-[40%]'>
        <p className='text-white text-[23px] font-semibold self-start'>People</p>
        {/* Search Bar */}
        <SearchBar onChange={(v)=> searchUserMutation.mutate({name: v})} />
        {searchedUsers.length !== 0 && results()}

        {searchedUsers.length === 0 && noResults()}
      </Dialog>
      
      <Fab onClick={(e)=>{
        e.stopPropagation()
        if(openedChatId){
          navigate('/dashboard/chats', {replace: true});
          return;
        }
        setTrayOpen(!trayOpen)
      }} style={{backgroundColor: trayOpen? 'black' : 'var(--purple)'}} title={trayOpen || openedChatId? openedChatId? "Close Chat" : undefined: "Start Chat"} className='absolute shadow-sm bottom-5 right-5'>
        {!trayOpen && !openedChatId && <Edit size={25} />}
        {(trayOpen || openedChatId) && <Add size={25} className='rotate-45' />}
      </Fab>

      {/* Fab to create community */}
      <Fab style={{zIndex: 2, backgroundColor: !trayOpen? 'black' : 'var(--purple)'}} title='Create Community' className={`absolute shadow-sm right-[40px] p-[8px] duration-[500ms] ${trayOpen? 'bottom-[110px] visible' : 'bottom-5 [visibility:hidden]' }`}>
        <People size={21} />
      </Fab>

      {/* Fab to add person */}
      <Fab onClick={()=> setAddingUser(true)} style={{zIndex: 2, backgroundColor: !trayOpen? 'black' : 'var(--purple)', transitionDelay: '100ms'}} title='Chat Someone'  className={`absolute shadow-sm right-[40px] p-[8px] duration-[500ms] ${trayOpen? 'bottom-[165px] visible' : 'bottom-5 [visibility:hidden]' }`}>
        <User size={21} />
      </Fab>

    </div>
  )
}
