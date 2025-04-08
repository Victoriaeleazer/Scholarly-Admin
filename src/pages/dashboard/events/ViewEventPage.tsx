import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { eventsDummyData } from '../../../dummy-data/events';
import formatDate from '../../../utils/DateFormat';

export default function ViewEventPage() {
  let { eventId } = useParams();
  const navigate = useNavigate();

  const events = eventsDummyData();
  const event = events.find(event => event.id === eventId);

  if (!event) {
    return <div className='text-white'>Event not found</div>;
  }

  const CloseEvent = () => {
    navigate(-1);
  };

 
  return (
    <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-tertiary p-6 rounded-lg w-1/2 text- white">
            <h2 className="text-2xl font-semibold mb-4">{event.eventTitle}</h2>
            <p className="mb-4">{event.eventDescription}</p>
            <p><strong>Designated Time:</strong> {formatDate(event.designatedTime, true)}</p>
            <p><strong>Created Time:</strong> {formatDate(event.createdTime, false)}</p>
            <div className="mt-4">
              <img src={event.eventPhoto} alt={event.eventTitle} className="w-full h-auto rounded-lg" />
            </div>
            <button 
              onClick={CloseEvent} 
              className="mt-6 px-4 py-2 bg- bg- bg-background text-white rounded-lg hover:bg-purple"
            >
              Close
            </button>
          </div>
        </div>
  );
}