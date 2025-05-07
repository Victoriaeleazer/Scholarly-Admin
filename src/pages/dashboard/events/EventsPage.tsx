import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React, { useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noEventsAnim from '../../../assets/lottie/no-events.json';
import EventsList from './EventsList';
import { eventsDummyData } from '../../../dummy-data/events';
import Button from '../../../components/Button';
import Dialog from '../../../components/Dialog';
import { delay } from '../../../services/delay';
import { useMutation } from '@tanstack/react-query';

export default function EventsPage() {
    const [events, setEvents] = useState(eventsDummyData());
    const [popup, showPopup] = useState(false);
    const [eventType, setEventType] = useState<'announcement' | 'project' | 'qa' | ''>('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateTime, setEventDateTime] = useState('');
    

    async function createEvent(eventData: { eventName: string; eventDescription: string; eventType: string }) {
      console.log('Event created:');
    
      await delay(2000);}
      
      

      const eventMutation = useMutation({
        mutationFn: createEvent,
        onSuccess: (data) => {
          showPopup(false);
          setEvents([...events, { ...data, eventId: events.length + 1 }]);
        },
        onError: (error) => {
          console.error(error);
        },
      })

   

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

        <Dialog
  show={popup}
  cancelable={false}
  onClose={() => showPopup(false)}
  className="flex flex-col items-center justify-center gap-4 text-left w-[400px]"
>
  <p className="text-white mb-3 text-[23px] font-semibold self-start">Create Event</p>
  <form
    className="flex flex-col items-center justify-center gap-4 text-left w-full"
    onSubmit={(e) => {
      e.preventDefault();
      eventMutation.mutate({ eventName, eventDescription, eventType });
    }}
  >
    <input
      onChange={(e) => setEventName(e.target.value.trim())}
      required
      placeholder="Event Name"
      multiple={false}
      className="w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none"
    />

<textarea
      onChange={(e) => setEventDescription(e.target.value.trim())}
      required
      placeholder="Enter Event Description"
      rows={5}
      draggable={false}
      className="w-full resize-none bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none scholarly-scrollbar purple-scrollbar"
       />

<input
    type="datetime-local"
    onChange={(e) => setEventDateTime(e.target.value)}
    required
    className="w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary text-white focus:outline-none "
  />
    
    {/* <select
      onChange={(e) => setEventType(e.target.value.trim() as 'announcement' | 'project' | 'qa')}
      required
      multiple={false}
      className={`w-full bg-background px-3 py-4 rounded-[15px] text-[14px] placeholder:text-secondary ${
        eventType === '' ? 'text-secondary' : 'text-white'
      } focus:outline-none`}
    >
      <option className="bg-black text-secondary" value="">Concert</option>
      <option className="bg-black text-white" value="">Spelling Bee</option>
      <option className="bg-black text-white" value="">Interntional Day</option>
      <option className="bg-black text-white" value="">QA</option>
    </select>    */}
    <Button loading={eventMutation.isPending} title="Create" type="submit" className="max-h-[55px]" />
  </form>
</Dialog>

        
        <Fab onClick={()=>showPopup(true)} className='absolute shadow-sm bottom-5 right-5'>
                <Add size={25} />
              </Fab>
      </div>
    )
}
function setEventName(arg0: string): void {
    throw new Error('Function not implemented.');
}

