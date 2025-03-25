import React, { ReactNode } from 'react'
import { DirectMessage } from '../../../interfaces/DirectMessage'
import { Link } from 'react-router';
import { useAdmin } from '../../../provider/AdminProvider';
import { useTypingIndicator } from '../../../provider/TypingIndicatorProvider';
interface props{
    dm: DirectMessage
}

export default function DMWidget({dm}: props) {
    const inChat = location.pathname.includes(`chats/${dm.id}`);
    const {admin} = useAdmin();
    const {indicator} = useTypingIndicator();
    const isCommunityDM = !!dm.community;
    const isSender = dm.latestMessage?.senderId === admin?.id;

    if(indicator){
        console.log("Is Typing Indicator....");
    }

    let text: ReactNode = <p>Start your legendary conversation with <span className='text-white'>{dm.name.split(' ')[0]}</span></p>;
    if(dm.latestMessage){
      const attachmentType = dm.latestMessage.attachmentType!;
      text = dm.latestMessage.attachmentType ? <span className='font-semibold'>{`Sent a${['video', 'document'].includes(attachmentType)? '': 'n'} ${attachmentType}`}</span> :  dm.latestMessage.message;
    }

    let sender: ReactNode = <></>;
    if(!isSender && isCommunityDM){
      sender = <span className='font-semibold'>{dm.recipients.find(member => dm.latestMessage?.senderId === member.id)?.firstName ?? "Someone"}: </span>;
    } else if(isSender){
      sender = <span className='font-semibold'>You: </span>
    }

    if(dm.latestMessage?.messageType !== 'chat'){
      sender = <></>
    }
    if(indicator?.isTyping && indicator.typer !== admin?.id){
        const typer = dm.recipients.find(user => user.id === indicator.typer);
        sender = <></>
        text = <em className='font-semibold text-blue'>{isCommunityDM? (typer?.firstName ?? "Someone") + " is typing..."  : "typing..."}</em>

    }
    
    return (
      <Link to={dm.id} key={dm.id} replace={!location.pathname.endsWith('chats')} className={`w-full flex bg-transparent text-white border-white border-b border-opacity-10 last:border-b-0 gap-5 items-center py-5 px-4 justify-center ${location.pathname.includes(dm.id)? 'bg-white bg-opacity-5' : ''}`}>
      <div className='w-[45px] h-[45px] rounded-circle overflow-hidden'>
        {dm.profile && <img src={dm.profile} alt='Channel Photo' className='w-full h-full object-cover' />}
        {!dm.profile&& <div className='w-full h-full flex items-center justify-center open-sans font-medium text-[15px] text-center' style={{backgroundColor:dm.color}}>{(dm.name ?? "Someone").split(' ').map(name=> name.charAt(0).toUpperCase()).slice(0, Math.min(2, (dm.name ?? "Someone").split(' ').length))}</div>}
      </div>

      <div className='flex flex-1 flex-col items-start gap-0.5 justify-center overflow-hidden'>
        <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{dm.name}</p>
        <p className={`${dm.unreadMessages > 0 && !inChat? 'text-blue font-semibold':'text-secondary'} text-[12px] font-[Raleway] whitespace-nowrap text-ellipsis overflow-hidden`}>{sender}{text}</p>
      </div>

      {dm.unreadMessages !== 0 && !inChat && <div className='rounded-circle min-w-7 min-h-7 flex items-center justify-center text-center text-[11px] bg-purple font-extrabold'>{dm.unreadMessages}</div>}
    </Link>
    );
}
