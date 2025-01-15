import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React, { useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noEventsAnim from '../../../assets/lottie/no-events.json';
import EventsList from './EventsList';
import { eventsDummyData } from '../../../dummy-data/events';

export default function EventsPage() {
    const [events, setEvents] = useState(eventsDummyData());

    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    // The Layout to show when there no events
    const NoEventsLayout = () => {
        return (
            <>
                <LottieWidget lottieAnimation={noEventsAnim} className={`w-[40%] h-[40%] object-contain`} />
                <p>There are no events yet.<br />You can create an event</p>
                
            </>
        )
    }



    

    //The layout to show then there are events
    return (
      <div className={`w-full h-full bg-transparent items-center justify-center flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} relative`}>

        {events.length ===0 && <NoEventsLayout />}

        {events.length > 0 && <EventsList events={events} />}
        
        <Fab>
            <Add size={25} />
        </Fab>
      </div>
    )
}
