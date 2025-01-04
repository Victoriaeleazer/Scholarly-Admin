import "@stream-io/video-react-sdk/dist/css/styles.css";

import { PaginatedGridLayout, ParticipantView, DefaultVideoPlaceholder, hasVideo, StreamVideoParticipant, useCall, useCallStateHooks, useParticipantViewContext, VideoPlaceholderProps, combineComparators, dominantSpeaker, pinned, publishingAudio, publishingVideo, reactionType, screenSharing, speaking, Video, NoiseCancellationProvider, hasAudio, SpeakerLayout, SpeakerLayoutProps, PaginatedGridLayoutProps } from '@stream-io/video-react-sdk'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IoHandRightOutline, IoHandRightSharp } from "react-icons/io5";
import {Call as PhoneCall, EmojiHappy, Grid2, Grid5, Grid7, MessageText1, Microphone, Video as VideoIcon, MicrophoneSlash1, VideoSlash, MicrophoneSlash, Microphone2, MirroringScreen, Maximize2} from 'iconsax-react'
import CallChannelData from '../../interfaces/CallChannelData';
import { getAdminUserData, getChannel } from '../../services/user-storage';
import { useMutation } from '@tanstack/react-query';
import { FaSpinner } from 'react-icons/fa6';
import { delay } from '../../services/delay';
import { CallContext } from '../dashboard/CallLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

import './call-page.css'
import { NoiseCancellation } from "@stream-io/audio-filters-web";
import ProfileIcon from "../../components/ProfileIcon";
import AestheticTabbar from "../../components/AestheticTabbar";

const comparator = combineComparators(
    pinned, // 1. pinned participants first
    screenSharing, // 2. participants who are screensharing
    dominantSpeaker, // 3. dominant speaker
    reactionType("raised-hand"), // 4. participants with raised hand
    publishingVideo, // 5. participants publishing video
    publishingAudio, // 6. participants publishing audio
    speaking, // 7. participants currently speaking

    // 8. everyone else
);



export default function CallPage() {
    const call = useCall();

    const navigate = useNavigate();

    const {useCallMembers, useHasOngoingScreenShare, useScreenShareState, useLocalParticipant, useMicrophoneState, useCameraState, useParticipants, useCallState} = useCallStateHooks()

    const callState = useCallState();

    const callContext = useContext(CallContext)

    const participants = useParticipants({sortBy: comparator});

    const localParticipant = useLocalParticipant();

    const microphoneState = useMicrophoneState();

    const cameraState = useCameraState();

    const screenShareState = useScreenShareState();

    const hasOngoingScreenShare = useHasOngoingScreenShare();

    const callData = useMemo(()=> callState.custom as CallChannelData, [callState]);

    const channel = useMemo(()=> getChannel(callData.id), [callData]);

    const [layoutType, setLayoutType] = useState<'grid' | 'bottom' | 'right'>('grid')

    const [commentsOpen, openComments] = useState(true);

    const [sideIndex, setIndex] = useState(0);

    const admin = getAdminUserData();

    const noiseCancellation = useMemo(() => new NoiseCancellation(), []);


    // To disable mic and camera when the screen is left.
    useEffect(()=>{
        return ()=>{
            if(call){
                call.camera.disable();
                call.microphone.disable();
            }
        }
    }, [])

    // To automatically change the layout type to side when screensharing
    useEffect(()=>{
        if(hasOngoingScreenShare){
            setLayoutType('right')
            return;
        }

        setLayoutType('grid');
    }, [hasOngoingScreenShare])

    const ParticipantVideo = (props: {participant: StreamVideoParticipant}) =>{
        const {participant} = props;
        
        const member = useMemo(()=>channel?.members.find(member=> member.id === participant.userId), [participant])
    
        // useEffect(() => {
        //     if (videoRef.current && participant.videoStream) {
        //         videoRef.current.srcObject = participant.videoStream;
        //     }

        //     if (audioRef.current && participant.audioStream) {
        //         audioRef.current.srcObject = participant.audioStream;
        //     }
        // }, [participant.videoStream, participant.audioStream]);
    
        return <ParticipantView key={participant.sessionId}  VideoPlaceholder={CustomVideoPlaceholder} ParticipantViewUI={CustomParticipantViewUI} participant={participant} muteAudio />
    }

    const microphoneMutation = useMutation({
        mutationFn: async ()=>{
            await microphoneState.microphone.toggle();
        }
    });

    const cameraMutation = useMutation({
        mutationFn: async ()=>{
            await cameraState.camera.toggle();
        }
    });

    const screenShareMutation = useMutation({
        mutationFn: async ()=>{
            await screenShareState.screenShare.toggle();
        }
    });

    const endCall = useMutation({
        mutationFn: async ()=>{
            await delay(3000);
            if(call?.isCreatedByMe){
                await call.endCall();
                callContext?.setCall(undefined);
                return;
            }
            await call?.leave({reject:true, reason:'I Left'});
            callContext?.setCall(undefined);
        },
        onSuccess: ()=>{
            toast.success("You left the call");
            navigate(`/dashboard/channels/${channel?.id}`, {replace:true});
        },
        onError: ({message})=>{
            if(message.toLowerCase().includes('already been left')){
                callContext?.setCall(undefined);
                navigate(`/dashboard/channels/${channel?.id}`, {replace:true});
                return;
            }
            toast.error("Unable to leave", {description:message})
        }
    })

    const getGridColumns = ()=>{
        const count = participants.length;

        if(count <=4){
            return 2
        }
        if(count <=6){
            return 3;
        }
        
        return 4;

    }

    const CustomParticipantViewUI = () => {
        const { participant } = useParticipantViewContext();

        const isNotGrid = layoutType !== 'grid';

        const member = useMemo(()=>channel?.members.find(member=> member.id === participant.userId), [participant])
        return (
          <div style={{'--str-video__primary-color': member?.color} as Record<string, any>} className="absolute bottom-[5%] left-[2%] right-[2%] flex justify-between items-center z-30">
            <div style={{fontSize: isNotGrid? '16px' : '12px'}} className="rounded-[20px] w-fit px-5 py-1 open-sansfont-semibold bg-black bg-opacity-35">{participant.userId === localParticipant?.userId? 'You' : participant.name.split(' ').slice(0, 1)}</div>

            <div className="rounded-circle font-semibold bg-black bg-opacity-35 p-2.5 flex flex-center">
                
                {!hasAudio(participant) && <MicrophoneSlash size={isNotGrid? 18 : 14} variant="Bold" />}

                {hasAudio(participant) && <Microphone2 size={isNotGrid? 18: 14} variant="Bold"/>}
            </div>
          </div>
        );
    };

    const CustomParticipantViewSpotlightUI = () => {
        const { participant } = useParticipantViewContext();

        const [participantInSpotlight] = participants;

        const member = useMemo(()=>channel?.members.find(member=> member.id === participant.userId), [participant])
        return (
          <div style={{'--str-video__primary-color': member?.color} as Record<string, any>} className="absolute bottom-[5%] left-[2%] right-[2%] flex justify-between items-center z-30">
            <div style={{fontSize: '16px'}} className="rounded-[20px] w-fit px-5 py-1 open-sansfont-semibold bg-black bg-opacity-35">{participant.userId === localParticipant?.userId? 'You' : participant.name.split(' ').slice(0, 1)}</div>

            <div className="rounded-circle font-semibold bg-black bg-opacity-35 p-2.5 flex flex-center">
                
                {!hasAudio(participant) && <Maximize2 size={18} variant="Linear" />}
            </div>
          </div>
        );
    };
    
    const CustomVideoPlaceholder = ({ style }: VideoPlaceholderProps) => {
        const { participant } = useParticipantViewContext();

        const isInGrid = layoutType === 'grid';

        const member = useMemo(()=> channel?.members.find(member=>member.id === participant.userId), [participant])
        return (
            <div style={{backgroundColor:member?.color, letterSpacing: '3px', fontSize: isInGrid? '300%' :'150%' , width: isInGrid? '130px': '85px', height: isInGrid? '130px': '85px'}} className='w-[130px] h-[130px] bg-black aspect-square flex flex-center rounded-circle overflow-hidden text-center open-sans font-semibold text-white'>
                    {participant.image && <img className='w-full h-full object-cover object-center' src={participant.image} />}

                    {!participant.image && <p className=''>{participant.name.split(' ').map(n => n.charAt(0).toUpperCase()).splice(0, 2)}</p>}
                </div>
        );
    };

    const LayoutMap = {
        right:{
            component: SpeakerLayout,
            title: "Right View",
            props:{
                participantsBarPosition: 'right',
                VideoPlaceholder: CustomVideoPlaceholder,
                ParticipantViewUIBar: CustomParticipantViewUI,
                ParticipantViewUISpotlight: CustomParticipantViewSpotlightUI,
                mirrorLocalParticipantVideo: false
            } as SpeakerLayoutProps
        },
        grid:{
            component: PaginatedGridLayout,
            title: "Grid View",
            props:{
                VideoPlaceholder: CustomVideoPlaceholder,
                ParticipantViewUI: CustomParticipantViewUI,
                mirrorLocalParticipantVideo: false,
            } as PaginatedGridLayoutProps
        },
        bottom:{
            component: SpeakerLayout,
            title: "Bottom View",
            props:{
                participantsBarPosition: 'bottom',
                VideoPlaceholder: CustomVideoPlaceholder,
                ParticipantViewUIBar: CustomParticipantViewUI,
                ParticipantViewUISpotlight: CustomParticipantViewSpotlightUI,
                mirrorLocalParticipantVideo: false,
            } as SpeakerLayoutProps
        }
    }

    const LayoutComponent = LayoutMap[layoutType].component;
    const componentProps = LayoutMap[layoutType].props;
  
    return (
    <div className='w-full h-full fixed z-[100] bg-black flex'>

        <NoiseCancellationProvider noiseCancellation={noiseCancellation}>
            <div className='w-full h-full flex bg-tertiary bg-opacity-30'>
                {/* Call Details Section */}
                <div className='flex flex-1 flex-col h-full'>
                    {/* Header Displaying Channel Info & Layout Controls */}
                    <div className='h-fit w-full text-white py-7 px-8 flex items-center gap-5'>
                        <div className='w-[40px] h-[40px] rounded-circle overflow-hidden flex flex-center text-center open-sans font-bold text-white text-[27%]' style={{backgroundColor:channel?.color}}>
                            {!channel?.channelProfile && <p>{channel?.channelName.split(' ').map(a=> a.charAt(0).toUpperCase()).splice(0, Math.min(2, channel.channelName?.split(' ').length))}</p>}
                            {channel?.channelProfile && <img className='w-full h-full object-cover object-center' src={channel.channelProfile} />}
                        </div>
                        <p className='font-semibold raleway text-xl'>{channel?.channelName}</p>
                        <p>{participants.length} Participants</p>

                        {/* Spacer */}
                        <div className='flex flex-1' />

                        {/* Layout Controls */}
                        <Grid7 onClick={()=>setLayoutType('bottom')} style={{color: layoutType === 'bottom'? channel?.color : 'var(--secondary)'}} className='cursor-pointer transition-all ease duration-500' size={25} variant='Bold' />

                        <Grid5 onClick={()=>setLayoutType('right')} style={{color: layoutType === 'right'? channel?.color : 'var(--secondary)'}} className='cursor-pointer transition-all ease duration-500' size={25} variant='Bold' />

                        <Grid2 onClick={()=>setLayoutType('grid')} style={{color: layoutType === 'grid'? channel?.color : 'var(--secondary)'}} className='cursor-pointer transition-all ease duration-500' size={25} variant='Bold' />

                        

                        

                    </div>

                    {/* My Custom UI */}
                    {/* <div className='w-full flex flex-1 flex-col bg-black pt-5 px-8 overflow-hidden'>
                        <div className='w-full h-full '>
                            <div style={{gridTemplateColumns: `repeat(3, minmax(0, 1fr))`}} className='w-full h-full grid grid-rows-1 gap-4'>
                                        {participants.map(participant => <ParticipantVideo participant={participant} />)}
                            </div>
                        </div>

                            
                    </div> */}
                

                    {/* Using Streams UI */}
                    <div className='w-full flex-1 bg-black overflow-hidden'>
                        <div className="w-full h-full p-8 flex flex-center">
                            <LayoutComponent {...componentProps} />
                        </div>

                    </div>
                    
                    {/* Call Controls */}
                    <div className='w-full flex gap-5 flex-center py-6'>

                        {/* Microphone Control */}
                        <div title={microphoneState.isMute? 'Turn on Mic': 'Turn off Mic'} onClick={()=>microphoneMutation.mutate()} className='p-3.5 cursor-pointer bg-tertiary text-white text-[28px] bg-opacity-70 rounded-2xl'>
                            {microphoneMutation.isPending && <FaSpinner className='animate-spin' />}
                            {microphoneState.isMute && !microphoneMutation.isPending && <MicrophoneSlash1 size={28} variant='Bold'/>}
                            {!microphoneState.isMute && !microphoneMutation.isPending && <Microphone size={28} variant='Bold' />}
                        </div>

                        {/* Video Control */}
                        <div title={cameraState.isMute? 'Turn On Camera': 'Turn Off Camera'} onClick={()=>cameraMutation.mutate()} className='p-3.5 cursor-pointer bg-tertiary text-white text-[28px] bg-opacity-70 rounded-2xl'>
                            {cameraMutation.isPending && <FaSpinner className='animate-spin' />}
                            {cameraState.isMute && !cameraMutation.isPending && <VideoSlash size={28} variant='Bold' />}
                            {!cameraState.isMute && !cameraMutation.isPending && <VideoIcon size={28} variant='Bold' />}
                        </div>

                        {/* Screen Share Control */}
                        <div title={screenShareState.isMute? 'Share your screen': 'Stop Sharing'} onClick={()=>screenShareMutation.mutate()} className='p-3.5 cursor-pointer bg-tertiary text-white text-[28px] bg-opacity-70 rounded-2xl'>
                            {screenShareMutation.isPending && <FaSpinner className='animate-spin' />}
                            {screenShareState.isMute && !screenShareMutation.isPending && <MirroringScreen size={28} variant='Linear' />}
                            {!screenShareState.isMute && !screenShareMutation.isPending && <MirroringScreen size={28} variant='Bold' />}
                        </div>

                        {/* Reaction Controls */}
                        <div onClick={()=> call?.ring()} className='p-3.5 bg-tertiary text-white bg-opacity-70 rounded-2xl'>
                            <EmojiHappy size={28} variant='Bold' />
                        </div>

                        {/* Raise Hand Controls */}
                        <div title='Raise A Hand' className='p-3.5 cursor-pointer bg-tertiary text-white bg-opacity-70 rounded-2xl'>
                            <IoHandRightOutline size={28} />
                        </div>

                        {/* Comment Controls */}
                        <div onClick={()=>openComments(!commentsOpen)} title={commentsOpen? 'Close Comments' : 'Open Comments'} className='p-3.5 bg-tertiary cursor-pointer text-white bg-opacity-70 rounded-2xl'>
                            <MessageText1 size={28} variant={commentsOpen? 'Bold' : 'Linear'} />
                        </div>

                        {/* End Call Controls */}
                        <div title={call?.isCreatedByMe? 'End the Call' :'Leave the Call'} onClick={()=>endCall.mutate()} className='p-3.5 cursor-pointer bg-red-700 text-[28px] text-white rounded-2xl'>
                            {endCall.isPending && <FaSpinner className='animate-spin' />}
                            {!endCall.isPending && <PhoneCall className='rotate-[135deg]' size={28} variant='Bold' />}
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className={`flex bg-tertiary bg-opacity-40 h-full flex-col items-center rounded-l-[35px] transition-all ease-out duration-1000 ${commentsOpen? 'w-[30%]': 'w-0'}`}>

                    <div className="w-full h-[96px] px-8 text-white flex items-center justify-between">
                        <p className="text-xl font-semibold open-sans">Meeting Details</p>

                        <ProfileIcon width={45} height={45} profile={admin.profile} member={admin} />
                    </div>

                    <div className="w-full px-8 mt-2">
                        <AestheticTabbar
                            tabs={['Comments', 'Participants']}
                            onSelectTab={(tab, index)=>setIndex(index!)}
                            index={sideIndex} />
                    </div>

                    
                </div>
            </div>
        </NoiseCancellationProvider>
    
    </div>
  )
}
