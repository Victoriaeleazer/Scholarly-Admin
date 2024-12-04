import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAdminUserData, getChannel, getChats, hasAdminUserData, saveChats } from '../../../services/user-storage';
import { toast } from 'sonner';
import { ArrowDown2, EmojiHappy, Microphone, Paperclip, Send } from 'iconsax-react';
import { sendChat, websocket_url } from '../../../services/api-consumer';
import { Chat } from '../../../interfaces/Chat';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '../../../interfaces/ApiResponse';
import { FaSpinner } from 'react-icons/fa6';
import { Client } from '@stomp/stompjs';
import { Channel } from '../../../interfaces/Channel';
import ChatWidget from './ChatWidget';
import { Admin } from '../../../interfaces/Admin';

// Where chatting is taking place.
export default function ChatsPage() {
  const {channelId} = useParams();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [admin, setAdmin] = useState<Admin>()
  const [channel, setChannel] = useState<Channel>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(true);
  const [text, setText] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    // Adjust the height dynamically
    const textarea = textareaRef.current;
    const maxHeight = 1.2 * 7 * 16;
    textarea!.style.height = "auto"; // Reset height to recalculate
    textarea!.style.height = `${Math.min(textarea!.scrollHeight, maxHeight)}px`;
    textarea!.style.overflowY = textarea!.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  async function sendMessage(){
      const chat  = {message: text, senderId:admin?.id} as Chat;
      const send = await sendChat(channelId!, chat);

      if(send.status === 200){
        return send.data as ApiResponse;
      }

      console.error(send.data);

      throw new Error(send.data['message']);


  }

  function updateChannel(){
    const gottenChannel = getChannel(channelId!);

    if(gottenChannel){
      setChannel(gottenChannel);
      return;
    }
    toast.error("This channel seems to not be found");
    navigate(-1);


  }

  const handleScroll =()=>{
    if(!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

     // Calculate distance from the bottom
     const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

     // Set `canScroll` to true if the user is close to the bottom (e.g., 100px away)
    setCanScroll(distanceFromBottom < 100);

  }

  const insertInSortedOrder = (chats: Chat[], newChat: Chat): Chat[] => {
    const index = chats.findIndex(chat => new Date(chat.timestamp).getTime() > new Date(newChat.timestamp).getTime());
    if (index === -1) return [...chats, newChat];
    return [...chats.slice(0, index), newChat, ...chats.slice(index)];
  }

  useEffect(()=>{
    if(!hasAdminUserData()){
      toast.error("Please Log out and Login once more");
      navigate(-1);
      return;
    }
    setAdmin(getAdminUserData());
    updateChannel();
    const savedChats = getChats(channelId);
    if(JSON.stringify(savedChats) !== JSON.stringify(chats)){
      setChats(savedChats);
    }
    const createdClient = new Client({
      brokerURL: websocket_url,
      onConnect:()=>{
        console.log('Connected to chats websocket')
        
      
        createdClient.subscribe(`/chats/${channelId}`, (chatsApiResponse)=>{

          const data = (JSON.parse(chatsApiResponse.body) as ApiResponse).data;
          
          // If the response gotten is an array, then we are overwriting
          // the entire list since arrays are only returned if we are fetching for
          // list of chats.
          // Handle array response (overwrite)
          if (Array.isArray(data)) {
            // return;
            console.warn("Is Array!");
            const newChats = data
              .map(chat => chat as Chat)
              .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setChats(newChats);
            return;
          }
    
          // Handle single chat response (update)
          /// If it is not given as an array, then that means its a chat,
          // Hence, we make sure that any old version of this gotten chat
          // is removed and then the new one is added last (i.e overwritten and shown as latest).
          const chatData = data as Chat;
          const newChats : Chat[] = [...chats]
    
          const hasDuplicate = newChats.some(_chat => _chat.id === chatData.id);
    
          if(hasDuplicate){
            const index = newChats.findIndex(_chat => _chat.id === chatData.id);
            newChats[index] = chatData;
            console.log("Updated Chats Length Is: ", newChats.length);
            setChats(newChats);
          }else {
            console.log("Updated Chats Length Is: ", (chats.length+1));
            setChats(chats => [...chats, chatData]);
          }
    
    
        });

        // /// To always load the channels
        createdClient.publish({
          destination:`/scholarly/getChats/${channelId}`
        });

      },
      onStompError:()=>console.log("Stomp Error"),
      onWebSocketError:()=>console.log('Error'),
      onDisconnect:()=> console.log("Disconnected")
    });
    createdClient.activate();

    return ()=>{
      if(createdClient && createdClient.active){
        createdClient.deactivate({force:true});
      }
    };
  },[])

  useEffect(()=>{
    console.log("Chats Length is", chats.length);
    saveChats(channelId!, chats);
    

    if(!listRef.current) return;

    if(!canScroll) return;

    listRef.current.scrollTo({behavior:'smooth', top:listRef.current.scrollHeight});

  }, [chats, canScroll])

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data)=>{
      setText('')
    },
    onError: (error)=>{

    }
  });

  const header = ()=>(
    <div className='w-full cursor-pointer px-8 py-4 bg-transparent flex gap-7 items-center justify-center'>
      <div className='w-[45px] h-[45px] rounded-circle overflow-hidden'>
        <img src={channel?.channelProfile} className='w-full h-full rounded-circle object-cover' />
      </div>
      <div className='flex flex-col gap-0 flex-1 overflow-hidden'>
        <p className='text-white font-bold text-[16px] whitespace-nowrap text-ellipsis'>{channel?.channelName}</p>
        <p className='text-secondary font-[Raleway]'>{channel?.members.length} Member{channel?.members.length ===1?'':'s'}</p>
      </div>
    </div>
  )

  const footer = ()=>(
    <div className='w-full px-8 py-4 bg-transparent flex gap-7 items-center justify-center relative overflow-hidden'>
      <EmojiHappy variant='Bold'/>

      <textarea ref={textareaRef} value={text} onChange={handleInput} className='flex-1 select-text purple-scrollbar bg-transparent overflow-y-scroll resize-none scholarly-scrollbar' rows={1} placeholder="What's on your mind?" autoComplete='off' style={{overflowY:text.split("\n").length > 7 ? "auto" : "hidden", maxHeight:'calc(1.2em * 7)', lineHeight:'1.2em', resize:'none'}} />

      <div className={`flex gap-7 items-center justify-center ${text.trim().length === 0? 'opacity-100':'opacity-0 fixed -z-50 right-8'} transition-all ease duration-1000`}>
        <div title='Add Attachment' className='cursor-pointer'>
          <Paperclip size={28} />
        </div>

        <div title='Send VN' className="cursor-pointer">
          <Microphone size={28} />
        </div>
      </div>

      <div className={`text-purple cursor-pointer transition-all ease duration-500 flex items-center justify-center ${text.trim().length !== 0? 'w-[28px] opacity-100 ':'opacity-0 fixed -z-50 right-8 w-0'}`}>
        {!sendMessageMutation.isPending && <Send onClick={()=>sendMessageMutation.mutate()} variant='Bold' size={28} />}
        {sendMessageMutation.isPending && <FaSpinner className='animate-spin text-[16px] text-white' />}
      </div>
        
    </div>
  )

  const chatBody = ()=>(
    <div className="w-full flex flex-1 relative bg-black overflow-hidden">
      <div ref={listRef} onScroll={handleScroll} className='flex w-full flex-1 gap-1 overflow-x-hidden overflow-y-scroll flex-col scroll-smooth pt-10 pb-3 px-4 scholarly-scrollbar'>
        
        {chats.map((chat, index)=>{
          const isFirstMessage = index === 0;
          const isLastMessage = index === chats.length-1;
          const isSender = chat.senderId === admin?.id;
          let sameSender = false;
          let firstTimeSender = false;
          let lastTimeSender = false;
          let differentDay = true;
          let differentDayBelow = false;

          const areSameDay = (date1:string, date2:string)=>{
            const a = new Date(date1);
            const b = new Date(date2);

            const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
            const day2 = Math.floor(b.getTime() / (1000 * 60 * 60 * 24));
            return day1 !== day2;
          }


          if(!isFirstMessage && !isLastMessage){
            sameSender = chat.senderId === chats[index-1].senderId;
            differentDayBelow = areSameDay(chats[index+1].timestamp, chat.timestamp);
          }

          if(!isFirstMessage){
            firstTimeSender = chat.senderId !== chats[index-1].senderId || chat.messageType !== chats[index-1].messageType;
            differentDay = areSameDay(chats[index-1].timestamp, chat.timestamp);
          }

          if(!isLastMessage){
            lastTimeSender = chat.senderId !== chats[index+1].senderId
          }
          else if(!isFirstMessage){
            lastTimeSender = chat.senderId !== chats[index-1].senderId
          }


          return <ChatWidget key={chat.id} chat={chat} differentDay={differentDay} differentDayBelow={differentDayBelow} isSender={isSender} firstSender={firstTimeSender} lastMessageSent={isLastMessage} lastSender={lastTimeSender} sameSender={sameSender} />
        })}
      </div>

      {/* Icon That appears when it's time to scroll */}
      <div 
          onClick={()=>listRef.current?.scrollTo({behavior:'smooth', top:listRef.current?.scrollHeight})}
          className={`absolute bottom-7 left-[50%] z-[5] w-10 h-10 flex items-center justify-center rounded-circle bg-purple hover:bg-background transition-all ease-in-out duration-500 ${canScroll? 'opacity-20 -bottom-10' :'opacity-100'}`}>
          <ArrowDown2 size={25} variant='Bold' />
      </div>
    </div>
  )


  
  

  




  return (
    <div className='flex flex-col h-full w-full bg-tertiary text-white border border-tertiary rounded-[18px]'>
      {/* Header */}
      {header()}
      

      {/* Body */}
      {chatBody()}

      {/* Footer */}
      {footer()}
    </div>
  )
}
