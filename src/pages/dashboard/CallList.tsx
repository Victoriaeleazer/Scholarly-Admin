import { CallingState, useCall, useCallStateHooks, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { MouseEvent, useContext, useEffect } from 'react'
import OverlappingImages from '../../components/OverlappingImages';
import { getAdminUserData } from '../../services/user-storage';
import { CallContext } from './CallLayout';
import { useMutation } from '@tanstack/react-query';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'sonner';
import { delay } from '../../services/delay';
import { useNavigate } from 'react-router';

export default function CallList() {
    const call = useCall();
    const navigate = useNavigate();
    const client = useStreamVideoClient()!;
    const admin = getAdminUserData();
    const callContext = useContext(CallContext);

    const {useCallMembers, useParticipants, useCallState, useCallCustomData} = useCallStateHooks();
    const members = useCallMembers();
    const callCustomData = useCallCustomData();
    const participants = useParticipants();
    const callState = useCallState();

    if(!call) return (<></>);

    const inCall = participants.some(participant => participant.userId === admin.id);

    const closeCall = useMutation({
        mutationFn: async()=>{
            await delay(3000);

            if(!call.isCreatedByMe){
                await call.endCall();
                callContext?.setIncomingCall(undefined);
                callContext?.setCall(undefined);
                return;
            }

            await call.leave({reject: true,reason:"Leaving"})
            callContext?.setIncomingCall(undefined);
            callContext?.setCall(undefined);
        },
        onError: ({message})=>{
            toast.error("Couldn't leave call", {description:message})
        }
    });

    const acceptCall = useMutation({
        mutationFn: async()=>{
            await call.join();
        },
        onSuccess: ()=>{
            toast.success("Successfuly Joined Call");
            callContext?.setIncomingCall(undefined);
            callContext?.setCall(call);
        },
        onError: ({message})=>{
            toast.error("Couldn't join call", {description:message})
        }
    })

    const viewCall = ()=>{
        navigate(`/dashboard/channels/${callCustomData.id}?call=${callCustomData.id}`);
    }

    useEffect(()=>{

        if(callState.callingState === CallingState.LEFT){
            callContext?.setCall(undefined);
        }

        callContext?.setCall(call);
    }, [callState])


  return (
    <div className='w-full select-none cursor-pointer px-3 py-3 flex flex-1 items-center bg-green-700 rounded-[25px] gap-3 font-normal open-sans text-white h-full text-center'>
        <OverlappingImages outlineColor='var(--background)' images={members.map(part => part.user.image ?? {fullName: part.user.name!, color: part.user.custom.color})} />
        <p>Ongoing Conference Call from <span className='font-bold whitespace-nowrap text-ellipsis'>{callCustomData.name}</span>.</p>
        <p><span className='font-semibold'>{participants.length}</span> Currently in call.</p>

        {/* Spacer */}
        <div className='flex flex-1' />

        <div className='w-fit flex text-white text-[12px] font-semibold gap-4 dm-sans'>
            <div onClick={(e)=>inCall? viewCall() : acceptCall.mutate()} className='rounded-[20px] py-2 px-3 bg-white text-green-700 flex flex-center min-w-[80px]'>{acceptCall.isPending? <FaSpinner className='animate-spin' /> :  (inCall? 'View Call':'Join')}</div>
            <div onClick={(e)=>closeCall.mutate()} className='rounded-[20px] py-2 px-3 flex min-w-[80px] flex-center bg-red-700'>{closeCall.isPending? <FaSpinner className='animate-spin' /> :  (inCall? 'Leave Call' : 'Reject')}</div>
        </div>
    </div>
  )
}
