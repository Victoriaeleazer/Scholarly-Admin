import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React, { useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noEventsAnim from '../../../assets/lottie/no-events.json';
import EventsList from './EventsList';

export default function EventsPage() {
    const [events, setEvents] = useState([{id:'1', email:'taiwoteninlanimi@gmail.com', firstName:'Teninlanimi', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'admin', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'},
        {id:'2', email:'teninlanimitaiwo@gmail.com', firstName:'Fola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://imgcdn.stablediffusionweb.com/2024/5/8/579453e2-3fa3-4d2c-a059-ccc3096780f3.jpg'},
        {id:'3', email:'teninlanimi@gmail.com', firstName:'Bola', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/Beautiful-Women-In-The-World.jpg'},
        {id:'4', email:'teni@gmail.com', firstName:'Bamidele', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeZjZWEr4oFmJhILQQgTy7-WUX9BmRrAAFw&s'},
        {id:'5', email:'tai@gmail.com', firstName:'Teni', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fmen%2F&psig=AOvVaw3tt5LhAhA799g-pEhib0Bj&ust=1732916963361000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiL0fmAgIoDFQAAAAAdAAAAABAJ'},
        {id:'6', email:'avffg@gmail.com', firstName:'David', lastName:'Taiwo', phoneNumber:'+2349068345482', role:'student', profile:'https://res.cloudinary.com/dq18zmq0f/image/upload/v1732807848/file.jpg'}]);

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
