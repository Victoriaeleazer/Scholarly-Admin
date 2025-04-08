import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Event } from "../../../interfaces/Event";
import { SearchNormal1 } from "iconsax-react";
import ProfileIcon from "../../../components/ProfileIcon";
import formatDate from "../../../utils/DateFormat";
import OverlappingImages from "../../../components/OverlappingImages";
import { User } from "../../../interfaces/User";

interface Props {
  events: Event[];
}

export default function EventsList({ events }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  // Filter events based on the search term
  const filteredEvents = events.filter((event) =>
    event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEventPage = (eventId: string) => {
    navigate(`/dashboard/events/${eventId}`);
  };

  return (
    <div className="text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8">
      {/* <!-- Title and Search Bar in the Same Line --> */}
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold text-white">Events</h1>

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
      <div className="overflow-x-hidden bg-tertiary shadow-md rounded-2xl">
        <table className="w-full h-fit rounded-lg border-separate table-fixed border-spacing-0 overflow-hidden">
          <thead className="p-5 py-3 h-[70px] border-b">
            <tr className="text-white text-left text-[15px] font-bold">
              <th className="px-4 pl-6 py-2">Event Title</th>
              <th className="px-4 text-center py-2">Event Description</th>
              <th className="px-4 text-center py-2">Designated Time</th>
              <th className="px-4 text-center py-2">Created Time</th>
              <th className="px-4 text-center py-2">Audience</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {filteredEvents.map((event, index) => (
              <tr
                key={index}
                className="border-0 bg-tertiary odd:bg-background hover:bg-light-purple hover:bg-opacity-20 transition-colors ease duration-300 text-white font-medium cursor-pointer hover:[--overlapping-outline-color:--purple]"
                onClick={() => openEventPage(event.id)}
              >
                <td className="px-4 pl-6 py-4">
                  <div className="flex items-center">
                    <ProfileIcon profile={event.eventPhoto} className="w-8 h-8 mr-2" width={"32px"} height={"32"} />
                    <p>{event.eventTitle}</p>
                  </div>
                </td>
                <td className="px-4 py-2">{event.eventDescription}</td>
                <td className="px-4 py-2">{formatDate(event.designatedTime, true)}</td>
                <td className="px-4 py-2">{formatDate(event.createdTime, false)}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-center">
                    <OverlappingImages size={25} outline={3.5} ratio={0.25} textSize={10} outlineColor={index % 2 ? 'var(--tertiary)' : 'var(--background)'} images={(event.audience as User[]).map(aud => aud.profile ?? { color: aud.color, fullName: `${aud.firstName} ${aud.lastName}` })} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}