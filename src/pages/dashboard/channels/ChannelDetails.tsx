import React, { ChangeEvent, LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import { Channel } from '../../../interfaces/Channel'
import { Add, ArrowLeft, ArrowRight2, Dislike, Edit2, ExportCircle, PlayCircle, ProfileAdd, Trash } from 'iconsax-react'
import { Chat } from '../../../interfaces/Chat'
import PageSlider from '../../../components/PageSlider'
import { getAdminUserData, getChats } from '../../../services/user-storage'
import Fab from '../../../components/Fab'
import Dialog from '../../../components/Dialog'
import Button from '../../../components/Button'
import { useMatch, useNavigate, useParams } from 'react-router'
import { useAppSelector } from '../../../hooks/redux-hook'
import { removeMember, sendInvitation, updateChannelPhoto } from '../../../services/api-consumer'
import { ApiResponse } from '../../../interfaces/ApiResponse'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { FaSpinner } from 'react-icons/fa6'



export default function ChannelDetail() {
  const {channelId} = useParams();

  const navigate = useNavigate();

  const admin = getAdminUserData();

  const channel = useAppSelector((state)=> state.channels.value.find(channel => channel.id === channelId))

  const fileSelectRef = useRef<HTMLInputElement>(null);

  const isCreator = channel?.creator?.id === admin?.id;

  const media = getChats(channelId ?? '').filter(chat => chat.attachment && ['image', 'video'].includes(chat.attachmentType))

  const [wantToLeaveChannel, decideToLeaveChannel] = useState(false);

  const [inviteeEmail, setInviteeId] = useState('');

  const [addMemberPopup, showAddMemberPopup] = useState(false);

  const [newProfile, setNewProfile] = useState<File | null>(null);

  const profile = useMemo(()=>newProfile? URL.createObjectURL(newProfile): null, [newProfile]);

  const [index, setIndex] = useState(0)

  // Clean Up Effect to remove the created Object URL from the memory
  useEffect(()=>{
    return ()=>{
      if(profile){
        URL.revokeObjectURL(profile);
      }
    }
  },[])

  const updateChannelPhotoMutation = useMutation({
    mutationFn: async ()=>{
      const response = await updateChannelPhoto(channelId!, newProfile!);
      
      const data = response.data as ApiResponse;

      if(response.status !== 200){
        throw Error(data.message);
      }

      return data;
    },
    onSuccess: ({message, data})=>{
      setNewProfile(null)
      toast.success(message);
    },
    onError: ({message})=>{
      toast.error("Unable to Upload Photo", {description: message});
    }
  })

  const detailsHeader = ()=>(
      <div className='w-full cursor-pointer pb-8 bg-tertiary flex flex-col relative gap-4 items-center justify-center'>
        <div className='w-full flex justify-between top-8 px-8 sticky z-[3] text-white font-semibold'>
          <ArrowLeft className='' onClick={()=> navigate(`../${channelId}`, {replace:true})} size={30} />
          {newProfile && !updateChannelPhotoMutation.isPending && <p className='text-white' onClick={()=>updateChannelPhotoMutation.mutate()}>Save</p>}
          {newProfile && updateChannelPhotoMutation.isPending && <FaSpinner className='animate-spin' />}
        </div>


        {/* To handle file select. Don't remove */}
        <input type='file' onChange={onImagePicked} ref={fileSelectRef} accept='image/*' multiple={false} className='[display:none]' />

        <div onClick={()=>{
          if(channel?.creator?.id === admin.id){
            fileSelectRef.current?.click();
          }
        }} className='w-[130px] h-[130px] relative mb-1 rounded-circle select-none flex flex-center text-center text-white open-sans text-4xl font-semibold' style={{backgroundColor:channel?.color, letterSpacing:2}}>
          {!(channel?.channelProfile || newProfile) && <p>{channel?.channelName.split(' ').map(name => name.charAt(0).toUpperCase()).splice(0, 2)}</p>}
          {(channel?.channelProfile || newProfile) && <img className='w-full h-full object-cover object-center rounded-circle' src={profile ?? channel?.channelProfile} alt='Channel Profile'  />}
          {channel?.creator?.id === admin.id && <div style={{backgroundColor:channel?.color}} className='w-[22%] h-[22%] rounded-circle absolute bottom-1 right-1 outline flex flex-center outline-tertiary'>
            <Edit2 variant='Bold' size={'60%'} />
          </div>}
        </div>
        
  
        <p className='font-bold font-[Raleway] text-lg'>{channel?.channelName}</p>
      </div>
    )
  
  const onImagePicked = (e: ChangeEvent<HTMLInputElement>) =>{
    if(profile){
      URL.revokeObjectURL(profile);
    }
    const files = e.target.files ?? [];
    const file = files[0];

    setNewProfile(file);
  }

  const detailsBody = ()=>(
    <div className='w-full flex relative flex-col'>
      <div className="w-full bg-tertiary sticky top-0 z-[2] flex flex-col gap-2">
        <div className="flex w-full pt-3 pb-1">
          <div onClick={()=>setIndex(0)} className={`flex select-none transition-colors ease cursor-pointer flex-1 text-center items-center justify-center font-medium ${index ===0?'text-white':'text-secondary'}`}>Details</div>
          <div onClick={()=>setIndex(1)} className={`flex select-none transition-colors ease cursor-pointer flex-1 text-center items-center justify-center font-medium ${index ===1?'text-white':'text-secondary'}`}>Media</div>
          <div onClick={()=>setIndex(2)} className={`flex select-none transition-colors ease cursor-pointer flex-1 text-center items-center justify-center font-medium ${index ===2?'text-white':'text-secondary'}`}>Members</div>
        </div>
        <div className="w-full flex justify-start items-center">
          <div style={{transform:`translateX(${index *100}%)`}} className={`w-[33.33%] transition-transform duration-700 ease flex items-center justify-center`}>
            <div className='w-[30%] bg-white h-1.5 rounded-t-2xl'/>
          </div>
        </div>
        
      </div>
      <PageSlider currentIndex={index} alignPages='start' className='h-fit bg-black overflow-hidden'>
        {detailsTab()}
        {mediaTab()}
        {membersTab()}

      </PageSlider>
    </div>
  )

  const mediaTab = ()=>(
    <div className='w-full h-fit grid gap-1 pt-1 grid-cols-4'>
      {media.map(chat =>(
        <div className='relative cursor-pointer aspect-square overflow-hidden'>
          <img className='w-full h-full object-cover' src={chat.thumbnail ?? chat.attachment} alt="" />
          { chat.attachmentType === 'video' &&<div className='flex items-center justify-center w-full h-full top-0 absolute z-[2] bg-black bg-opacity-30'>
            <PlayCircle variant='Bold' size={45} />
          </div>}
        </div>
      ))}
    </div>
  )

  const formattedDate = ()=>{
    const date = new Date(channel!.createdAt)
      const options = { day: '2-digit', month: 'short', year:'numeric' } as Intl.DateTimeFormatOptions;
      return date.toLocaleDateString('en-GB', options);
  }

  const detailsTab = ()=>(
    <div className='flex flex-col w-full h-fit justify-start items-start py-5'>
      <p className='text-[22px] font-bold text-left mb-5 px-[30px] select-none'>Group Details</p>

      <div className='w-full h-fit px-[30px] flex select-none flex-col overflow-hidden text-sm text-[15px] mb-5 pb-5 border-b-4 border-tertiary last:border-0 text-secondary font-light gap-1.5 justify-center'>
        <p className='text-white text-[17px] font-medium'>Channel Name</p>
        <p>{channel!.channelName}</p>
      </div>
      <div className='w-full h-fit px-[30px] flex select-none flex-col overflow-hidden text-sm text-[15px] mb-5 pb-5 border-b-4 border-tertiary last:border-0 text-secondary font-light gap-1.5 justify-center'>
        <p className='text-white text-[17px] font-medium'>Channel Description</p>
        <p>{channel!.channelDescription}</p>
      </div>
      <div className='w-full h-fit px-[30px] flex select-none flex-col text-sm text-[15px] mb-5 pb-5 border-b-4 border-tertiary last:border-0 text-secondary font-light gap-1.5 justify-center'>
        <p className='text-white text-[17px] font-medium'>Channel Type</p>
        <p>{channel!.channelType.charAt(0).toUpperCase()}{channel!.channelType.substring(1)} Channel</p>
      </div>
      <div className='w-full h-fit px-[30px] flex flex-col select-none text-sm text-[15px] mb-5 pb-5 border-b-4 border-tertiary last:border-0 text-secondary font-light gap-1.5 justify-center'>
        <p className='text-white text-[17px] font-medium'>Date Created</p>
        <p>{formattedDate()}</p>
      </div>
      <div className='w-full h-fit px-[30px] flex select-none overflow-hidden text-[17px] mb-5 pb-7 pt-2 border-b-4 border-tertiary last:border-0 text-red-500 font-light gap-4 justify-start items-center'>
        <Dislike size={25} variant='Bold' />
        <p className='text-[18px] font-medium'>Report</p>
        <div className='flex flex-1' />
        <ArrowRight2 size={25} className='text-secondary' />
      </div>
      <div onClick={()=>decideToLeaveChannel(true)} className='w-full h-fit px-[30px] cursor-pointer flex select-none overflow-hidden text-[17px] mb-5 pb-7 pt-2 border-b-4 border-tertiary last:border-0 last:mb-0 last:pb-2 text-red-500 font-light gap-4 justify-start items-center'>
        {isCreator? <Trash size={25} variant='Bold' /> : <ExportCircle className='rotate-[225deg]' size={25} />}
        <p className='text-[18px] font-medium'>{isCreator? "Close Channel" : "Leave Channel"}</p>
        <div className='flex flex-1' />
        <ArrowRight2 size={25} className='text-secondary' />
      </div>


    </div>
  )

  const membersTab = ()=>(
    <div className='flex flex-col w-full h-fit justify-start items-start p-5 px-0'>
      <p className='text-[22px] font-bold text-left mb-5 px-2.5 select-none'>Members <span className='text-secondary text-lg'>({channel?.members?.length})</span></p>
      {[...channel!.members].reverse().map(member => (
        <div key={member.id} className='w-full border-b select-none cursor-pointer transition-colors ease duration-500 border-secondary hover:bg-white hover:bg-opacity-[0.025] gap-5 border-opacity-10 last:border-0 flex px-2.5 py-3'>
          <div style={{backgroundColor:member?.color}} className='w-[50px] h-[50px] rounded-circle overflow-hidden flex flex-center text-center text-white open-sans font-medium text-sm'>
            {!member.profile && <p>{member.firstName.charAt(0) + member.lastName.charAt(0)}</p>}
            {member.profile && <img src={member.profile} className='w-full h-full object-cover' fetchPriority='low' alt='profile-pic' />}
          </div>
          

          <div className='flex flex-1 flex-col items-start justify-center gap-0'>
            <p className='font-semibold text-lg' autoCapitalize='on'>{member.id === getAdminUserData()?.id? 'You': `${member.firstName} ${member.lastName}`}</p>
            <p className='text-[12px] text-secondary'>{member.id === channel?.creator?.id?'creator & ':''}{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const leaveChannel = async()=>{
    const response = await removeMember(channel?.id!, getAdminUserData()?.id ?? '');

    const body = (response.data as ApiResponse);

    if(response.status !== 200){
      throw new Error(body.message ?? "Unknown error when leaving channel")
    }

    return body;
  }

  async function addMember(){

    if(inviteeEmail === admin?.email.trim()){
      throw Error("You can't invite yourself")
    }
    const response = await sendInvitation(channelId!, inviteeEmail);
    const data = response.data as ApiResponse;

    if(response.status !== 200){
      throw Error(data.message ?? "Error when inviting user")
    }

    return data;
  }

  const leaveChannelMutation = useMutation({
    mutationFn: leaveChannel,
    onSuccess: ({message, data})=>{
      toast.success("Left Group")
      decideToLeaveChannel(false);
      navigate('dashboard/channels');
    },
    onError: ({message})=>{
      toast.error("Unable to Leave", {description: message})
    }
  })

  const invitationMutation = useMutation({
    mutationFn: addMember,
    onSuccess: ()=>{
      toast.success("Invitation Sent", {description:"Sent invitation to user successfully"})
      showAddMemberPopup(false);
    },
    onError: (error)=>{
      // toast.error("Invitation Unsuccessful", {description:error.message})
    }
  })



  return (
    <div className='h-full w-full bg-tertiary text-white border border-tertiary rounded-[18px] overflow-hidden'>
      {channel && <div className='w-full h-fit max-h-full flex flex-col bg-black items-center overflow-y-scroll scholarly-scrollbar'>
            {detailsHeader()}
            {detailsBody()}
      </div>}

      <Fab onClick={()=>showAddMemberPopup(true)} className={`bottom-10 right-10 transition-all ease duration-700 ${index !== 2? 'scale-0 -bottom-20 opacity-0 hidden': ''}`}>
        <ProfileAdd variant='Bold' />
      </Fab>
      

      {/* Leave Or Close Channel Dialog */}
      <Dialog
        show={wantToLeaveChannel}
        cancelable={false}
        negative
        className='w-[400px] flex flex-col items-center justify-center gap-4 text-center'
        onClose={()=>decideToLeaveChannel(false)}>
          <div className='w-[80px] h-[80px] overflow-hidden flex items-center text-white justify-center rounded-circle bg-red-700'>
              <div className='scale-[1.6]'>
                {isCreator? <Trash size={25} variant='Bold' /> : <ExportCircle className='rotate-[225deg]' size={25} />}
              </div>
          </div>
          <p className='text-white text-[18px] select-none font-semibold'>{isCreator? 'Close Channel' : 'Leave Channel'}</p>
          <p className='text-secondary select-none text-sm'>{isCreator? "Are you sure you want to close this channel?" : "Are you sure you want to leave this channel?"}<br />This action is irreverible</p>
          <div className='w-full flex justify-center items-center gap-3'>
            <Button className='text-[13px] max-h-[50px]' title={isCreator? 'Yes, I want to close it' : 'Yes, I want to leave'} onClick={()=>leaveChannelMutation.mutate()} loading={leaveChannelMutation.isPending} negative />
          </div>
      </Dialog>

      {/* Send Invitation Dialog */}
      <Dialog 
        cancelable
        onClose={()=>showAddMemberPopup(false)}
        show={addMemberPopup}
        className='flex flex-col items-center justify-center gap-4 text-left w-[400px]'>
        <p className='text-white mb-3 text-[23px] font-semibold self-start'>Add Member</p>
        <form
          className='flex flex-col items-center justify-center text-left w-full'
          onSubmit={(e)=>{
            e.preventDefault();
            invitationMutation.mutate();
          }}>
          <div className='mb-7 flex flex-col gap-2 w-full'>
            <input onChange={(e) => setInviteeId(e.target.value.trim())} required placeholder="Enter user's email" multiple={false} className='w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none' />
            <p style={{transitionBehavior:'allow-discrete'}} className={`${invitationMutation.isError? 'text-[14px]': 'text-[0px]'} text-red-500 text-left self-start ml-2 font-bold transition-all ease-in-out`}>{invitationMutation.error?.message}</p>
          </div>
          <Button loading={invitationMutation.isPending} title='Send Invitation' type='submit' className='max-h-[55px]'  />
        </form>
      </Dialog>
    </div>
    
  )
}
