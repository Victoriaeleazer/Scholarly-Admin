import React from "react";
import { useParams } from "react-router";

export default function ViewEventPage() {
  let {id} = useParams();

  return (
  <div className='text-black '>
    {id}

    <div className="container mx-auto p-6">
      {/* <!-- Title and Search Bar in the Same Line --> */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple">Event List</h1>

        {/* <!-- Search Bar --> */}
        <div className="relative w-80">
          <input 
            type="text" 
            placeholder="Search for events..." 
            className="w-full px-4 py-2 pl-10 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <!-- Search Icon (Optional) --> */}
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 16h4M10 12h4M10 8h4M4 12h.01"/>
          </svg>
        </div>
      </div>

    {/* <!-- Table --> */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-purple text-white text-left text-sm font-semibold">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Event Title</th>
              <th className="px-4 py-2">Event Description</th>
              <th className="px-4 py-2">Audience</th>
              <th className="px-4 py-2">Designated Time</th>
              <th className="px-4 py-2">Created Time</th>
              <th className="px-4 py-2">Event Photo</th>
            </tr>
          </thead>

            <tbody>
              <tr className="border-t border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">1</td>
                <td className="px-4 py-2 text-sm">Tech Conference 2024</td>
                <td className="px-4 py-2 text-sm">A conference about the latest in tech innovations.</td>
                <td className="px-4 py-2 text-sm">Tech Enthusiasts, Professionals</td>
                <td className="px-4 py-2 text-sm">January 15, 2024, 9:00 AM</td>
                <td className="px-4 py-2 text-sm">December 1, 2023, 10:00 AM</td>
                <td className="px-4 py-2">
                  {/* <!-- <img src="https://via.placeholder.com/50" alt="Event Photo" class="w-12 h-12 rounded-full object-cover"> --> */}
                </td>
              </tr>

              <tr className="border-t border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">2</td>
                <td className="px-4 py-2 text-sm">Music Festival</td>
                <td className="px-4 py-2 text-sm">An outdoor festival featuring top music acts.</td>
                <td className="px-4 py-2 text-sm">Music Lovers</td>
                <td className="px-4 py-2 text-sm">February 5, 2024, 12:00 PM</td>
                <td className="px-4 py-2 text-sm">November 20, 2023, 3:00 PM</td>
                <td className="px-4 py-2">
                  {/* <!-- <img src="https://via.placeholder.com/50" alt="Event Photo" class="w-12 h-12 rounded-full object-cover"> --> */}
                </td>
              </tr>

              <tr className="border-t border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">3</td>
                <td className="px-4 py-2 text-sm">Art Gallery Exhibition</td>
                <td className="px-4 py-2 text-sm">Showcasing modern art from emerging artists.</td>
                <td className="px-4 py-2 text-sm">Art Lovers, Collectors</td>
                <td className="px-4 py-2 text-sm">March 22, 2024, 6:00 PM</td>
                <td className="px-4 py-2 text-sm">October 10, 2023, 1:00 PM</td>
                <td className="px-4 py-2">
                  {/* <!-- <img src="https://via.placeholder.com/50" alt="Event Photo" class="w-12 h-12 rounded-full object-cover"> --> */}
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>

  </div>
)
  
}