import React from 'react'
import { Chat } from '../../../interfaces/Chat'
import { PlayCircle } from 'iconsax-react';

interface props{
    chat: Chat,
    isSender?:boolean,
    firstSender?:boolean,
    lastSender?:boolean,
    sameSender?:boolean,
    differentDay?:boolean,
    differentDayBelow?:boolean,
    lastMessageSent?:boolean
}

export default function ChatWidget({chat, isSender=false, differentDay=false, differentDayBelow=false, firstSender=true, sameSender=false, lastMessageSent=false, lastSender=false}: props) {
  

    const currentTime = new Date();
    const isToday = ()=>{
        const a = new Date(chat.timestamp)

        const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
        const day2 = Math.floor(currentTime.getTime() / (1000 * 60 * 60 * 24));
        return day1 === day2;
    }

    const isYesterday = ()=>{
        const a = new Date(chat.timestamp)

        const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
        const day2 = Math.floor(currentTime.getTime() / (1000 * 60 * 60 * 24));
        return day2-day1 === 1;
    }

    const formatedText = ()=>{
        const date = new Date(chat.timestamp)
        const isSameYear = currentTime.getFullYear() === date.getFullYear();
        const options = { day: '2-digit', month: 'short', year: isSameYear? undefined : 'numeric' } as Intl.DateTimeFormatOptions;
        let formattedDate = date.toLocaleDateString('en-GB', options);

        return formattedDate;
    }

    const otherType = ()=>(
        <div className='w-full flex flex-col gap-2 items-center justify-center'>
            {chat.attachment && <img className='rounded-circle w-[155px] h-[155px] border-[5px] border-tertiary object-cover' src={chat.attachment} alt='channel photo' />}
            <p className='text-white select-none text-[11px] font-semibold text-center bg-tertiary rounded-[15px] px-3 py-1.5'>{chat.message}</p>
        </div>
    )

    const messageType = ()=>(
        <div className={`w-full flex items-center ${isSender? 'justify-end':'justify-start'}`}>
            <div className={`${isSender? 'max-w-[47%] items-end' : 'max-w-[40%] items-start'} w-fit flex flex-col gap-[3px]`}>
                {chat.attachment && (
                    <div className='overflow-hidden rel max-h-[350px] rounded-[25px] relative w-full'>
                        {chat.attachmentType === 'video' && <div className='w-full absolute z-[1] flex items-center justify-center h-full bg-black bg-opacity-30'>
                            <PlayCircle variant='Bold' size={45} />
                            </div>}
                        <img className='w-full select-none h-auto min-h-[200px] max-h-[350px] object-cover' src={chat.thumbnail ?? chat.attachment} />
                    </div>
                )}
                {chat.message && (
                    <div className={`rounded-[20px] select-none w-fit py-2 px-4 flex flex-col items-center justify-center text-white text-[15px] cursor-pointer ${isSender? 'bg-purple' : 'bg-tertiary'} `} style={{
                        borderBottomRightRadius: !isSender? '20px': firstSender || differentDay? '8px':'20px',
                        borderTopRightRadius: !isSender?'20px': ((lastSender || lastMessageSent) && !differentDay) && !firstSender? '8px': differentDayBelow? '8px' : '20px',
                        borderBottomLeftRadius: isSender? '20px': firstSender || differentDay? '8px':'20px',
                        borderTopLeftRadius: isSender?'20px': ((lastSender || lastMessageSent) && !differentDay) && !firstSender? '8px': differentDayBelow? '8px' : '20px',

                    }}>
                        {chat.message}
                    </div>
                )}
            </div>
        </div>
    )

    const dateElement = ()=>(
        <div className='w-full flex items-center select-none justify-center'>
            <p className='text-white select-none text-[13px] font-[DM Sans] font-semibold text-center bg-tertiary rounded-[25px] px-4 py-2'>
                {isYesterday() && "Yesterday"}
                {isToday() && "Today"}
                {!isToday() && !isYesterday() && formatedText()}

            </p>
        </div>
    )
  
    return (
    <div className={`font-[RaleWay] w-full flex items-center mt-2 flex-col gap-5 justify-center`} style={{
        marginTop:differentDay? '40px': sameSender? '1px':firstSender? chat.messageType !== 'chat'? '4px' :'25px':'1px',
        marginBottom:chat.messageType !== 'chat'? '25px':'0px'
    }}>
        {differentDay && dateElement()}
        {chat.messageType !== 'chat' && otherType()}
        {chat.messageType === 'chat' && messageType()}
    </div>
  )
}
