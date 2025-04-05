import React, { useMemo, useState } from 'react'
import { useBatches } from '../../../provider/BatchesProvider'
import { SearchNormal1 } from 'iconsax-react';
import ProfileIcon from '../../../components/ProfileIcon';

export default function BatchesList() {
    const {myBatches} = useBatches();

    const [searchTerm, setSearchTerm] = useState("");


    const filteredBatches = useMemo(()=>myBatches.filter(batch => batch.course.courseName.includes(searchTerm.trim().toLowerCase())),[myBatches])


  return (
    <div className='text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8'>
        {/* <!-- Title and Search Bar in the Same Line --> */}
        <div className="flex justify-between items-center flex-wrap">
            <h1 className="text-3xl font-bold text-white">Your Cohorts</h1>

            {/* <!-- Search Bar --> */}
            <div className="relative w-full sm:w-80 bg-tertiary rounded-lg flex flex-center mt-4 sm:mt-0">
                <input 
                type="text" 
                placeholder="Search Cohort" 
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
            <table className='w-full h-fit rounded-lg border-separate table-fixed border-spacing-0 overflow-hidden'>
                <thead className="p-5 py-3 h-[70px] border-b">
                    <tr className="text-white text-left text-[15px] font-bold">
                        <th className="px-4 py-2">Course</th>
                        <th className="px-4 text-center py-2">Cohort Name</th>
                        <th className="px-4 text-center py-2">Started</th>
                        <th className="px-4 text-center py-2">Deadline</th>
                        <th className="px-4 text-center py-2">Students</th>
                        <th className="px-4 text-center py-2">Timetable</th>
                    </tr>
                </thead>

                <tbody className='text-[13px]'>
                    {Array.of([1,2,3]).map(((cohort, index) => (
                        <tr 
                        key={index}
                        className='border-0 bg-tertiary text-center odd:bg-background hover:bg-light-purple hover:bg-opacity-20 transition-colors ease duration-300 text-white font-normal cursor-pointer'>
                            <td className="pl-4 py-4">
                                <div className="flex w-full items-center gap-2 overflow-hidden">
                                    <ProfileIcon profile={'https://nordicapis.com/wp-content/uploads/A-Short-Guide-What-Types-of-Apps-Can-Be-Built-With-React.png'} className="" width={"32px"} height={"32px"} />
                                    <p className='truncate'>React Front-End Development</p>
                                </div>
                            </td>
                            <td className="px-4 py-2 truncate">{"Cohort Feb 2025"}</td>
                            <td className="px-4 py-2">{"20th Feb, 2025"}</td>
                            <td className="px-4 py-2">{"15th Apr, 2025"}</td>
                            <td className="px-4 py-2">5</td>
                            <td className="px-4 py-2">Mon, Wed, Fri</td>

                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
