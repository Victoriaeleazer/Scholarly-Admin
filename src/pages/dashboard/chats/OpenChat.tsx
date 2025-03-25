import React from 'react'

import openChatAnim from '../../../assets/lottie/open-chat.json'
import LottieWidget from '../../../components/LottieWidget'

export default function OpenChat() {
  return (
    <div className='h-full w-full flex flex-col bg-tertiary text-white rounded-[18px] justify-center items-center'>
        
        <LottieWidget lottieAnimation={openChatAnim} className='w-[300px] h-[300px]'/>

        <p>Open a chat to start chatting</p>
    </div>
  )
}
