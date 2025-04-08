import React, { useState, useEffect, useMemo } from "react";

import StudentRow from "./StudentRow";
import { useStudents } from "../../../provider/StudentsProvider";
import { SearchNormal1 } from "iconsax-react";

const StudentsList = () => {
  const {students} = useStudents();
  const [search, setSearch] = useState("");


  const filtered = useMemo(()=> students.filter((s) =>
    s.fullName.trim().toLowerCase().includes(search.trim().toLowerCase())
  ), [students, search]);

  return (
    <div className="text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8">
        {/* <!-- Title and Search Bar in the Same Line --> */}
        <div className="flex justify-between items-center flex-wrap">
            <h1 className="text-3xl font-bold text-white">Students</h1>

            {/* <!-- Search Bar --> */}
            <div className="relative w-full sm:w-80 bg-tertiary rounded-lg flex flex-center mt-4 sm:mt-0">
                <input 
                type="text" 
                placeholder="Search student" 
                className="w-full px-4 py-3.5 pl-10 text-secondary text-[13.5px] open-sans rounded-lg outline-none bg-tertiary focus:outline-none focus:ring-2 focus:ring-purple"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                {/* <!-- Search Icon (Optional) --> */}
                <SearchNormal1 size={18} className="absolute left-3 text-secondary" />
            </div>
        </div>
      <div className="overflow-x-hidden bg-tertiary shadow-md rounded-2xl">
        <table className="w-full h-fit rounded-lg border-separate table-fixed border-spacing-0 overflow-hidden">
          <thead className="p-5 py-3 h-[70px] border-b">
            <tr className="text-white text-left text-[15px] font-bold">
              <th className="px-4 py-2">Details</th>
              <th className="px-4 text-center py-2">Email</th>
              <th className="px-4 text-center py-2">Phone No.</th>
              <th className="px-4 text-center py-2">Counselor</th>
              <th className="px-4 text-center py-2">Date Joined</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {filtered.map((student, i) => (
              <StudentRow key={i} student={student} />
            ))}
            {filtered.length === 0 && <tr className='bg-background'><td className='text-center py-4' colSpan={5}>No search results for "<span className='font-bold'>{search}</span>".</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
