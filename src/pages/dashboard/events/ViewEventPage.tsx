import React from 'react'
import { useParams } from 'react-router';

export default function ViewEventPage() {
  let {eventId} = useParams();
  return (
    <div className='text-white'>
      {eventId}
      
    </div>
  )
}
