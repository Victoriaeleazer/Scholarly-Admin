import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React from 'react'
import Fab from '../../components/Fab';
import LottieWidget from '../../components/LottieWidget';

import noEventsAnim from '../../assets/lottie/no-events.json';

export default function EventsPage() {
  
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');
    return (
      <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
  
          <LottieWidget lottieAnimation={noEventsAnim} className={`w-[40%] h-[40%] object-contain`} />
          <p>There are no events yet.<br />You can create an event</p>
          <Fab>
              <Add size={25} />
          </Fab>
      </div>
    )
}
