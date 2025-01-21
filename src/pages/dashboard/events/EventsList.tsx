import React, { useState } from "react";
import { useParams } from "react-router";
import { Event } from "../../../interfaces/Event";
import { SearchNormal1 } from "iconsax-react";

interface Props {
  events: Event[];
}

export default function EventsList({ events }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { id } = useParams<{ id: string }>(); // Capture any params from the URL if needed

  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8">

      {/* <!-- Title and Search Bar in the Same Line --> */}
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold text-white">Event List</h1>

        {/* <!-- Search Bar --> */}
        <div className="relative w-full sm:w-80 bg-tertiary rounded-lg flex flex-center mt-4 sm:mt-0">
          <input 
            type="text" 
            placeholder="Search for events..." 
            className="w-full px-4 py-3.5 pl-10 text-secondary text-[13.5px] open-sans rounded-lg outline-none bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <!-- Search Icon (Optional) --> */}
          <SearchNormal1 size={18} className="absolute left-3 text-secondary" />
        </div>
      </div>

      {/* <!-- Table --> */}
      <div className="overflow-x-auto bg-tertiary shadow-md rounded-2xl">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-white text-left text-sm font-semibold">
              <th className="px-4 py-2">Event Title</th>
              <th className="px-4 py-2">Event Description</th>
              {/* <th className="px-4 py-2">Audience</th> */}
              <th className="px-4 py-2">Designated Time</th>
              <th className="px-4 py-2">Created Time</th>
              <th className="px-4 py-2">Event Photo</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="border-t border-b odd:bg-background hover:bg-purple text-white cursor-pointer"
                onClick={() => openEventModal(event)}
              >
                <td className="px-4 py-2">{event.eventTitle}</td>
                <td className="px-4 py-2">{event.eventDescription}</td>
                {/* <td className="px-4 py-2">{Array.isArray(event.audience) ? event.audience.join(", ") : event.audience}</td> */}
                <td className="px-4 py-2">{event.designatedTime}</td>
                <td className="px-4 py-2">{event.createdTime}</td>
                <td className="px-4 py-2">{event.eventPhoto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-tertiary p-6 rounded-lg w-1/2 text- white">
            <h2 className="text-2xl font-semibold mb-4">{selectedEvent.eventTitle}</h2>
            <p className="mb-4">{selectedEvent.eventDescription}</p>
            <p><strong>Designated Time:</strong> {selectedEvent.designatedTime}</p>
            <p><strong>Created Time:</strong> {selectedEvent.createdTime}</p>
            <div className="mt-4">
              <img src={selectedEvent.eventPhoto} alt={selectedEvent.eventTitle} className="w-full h-auto rounded-lg" />
            </div>
            <button 
              onClick={closeEventModal} 
              className="mt-6 px-4 py-2 bg- bg- bg-background text-white rounded-lg hover:bg-purple"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
