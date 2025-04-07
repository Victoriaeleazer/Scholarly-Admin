import { SearchNormal1 } from 'iconsax-react';
import React, { useMemo, useState } from 'react'
import { useCourses } from '../../../provider/CoursesProvider';
import ProfileIcon from '../../../components/ProfileIcon';
import formatDate from "../../../utils/DateFormat";
import OverlappingImages from '../../../components/OverlappingImages';
import formatCurrency from '../../../utils/NumberFormat';

export default function CourseList() {
 const {courses} = useCourses();
 
     const [searchTerm, setSearchTerm] = useState("");
 
 
     const filteredCourses = useMemo(()=>courses.filter(course => course.courseName.toLowerCase().includes(searchTerm.trim().toLowerCase())),[courses, searchTerm])
 
 
   return (
     <div className='text-white w-full min-h-full h-fit overflow-y-scroll scholarly-scrollbar purple-scrollbar px-6 py-8 flex flex-col gap-8'>
         {/* <!-- Title and Search Bar in the Same Line --> */}
         <div className="flex justify-between items-center flex-wrap">
             <h1 className="text-3xl font-bold text-white">Courses</h1>
 
             {/* <!-- Search Bar --> */}
             <div className="relative w-full sm:w-80 bg-tertiary rounded-lg flex flex-center mt-4 sm:mt-0">
                 <input 
                 type="text" 
                 placeholder="Search by course name" 
                 className="w-full px-4 py-3.5 pl-10 text-secondary text-[13.5px] open-sans rounded-lg outline-none bg-tertiary focus:outline-none focus:ring-2 focus:ring-purple"
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
                         <th colSpan={2} className="px-4 py-2">Course Name</th>
                         <th className="px-4 text-center py-2">Description</th>
                         <th className="px-4 text-center py-2">Created Time</th>
                         <th className="px-4 text-center py-2">Rec. Price</th>
                         <th className="px-4 text-center py-2">Students</th>
                     </tr>
                 </thead>
 
                 <tbody className='text-[13px]'>
                     {filteredCourses.map(((course, index) => (
                         <tr 
                         key={index}
                         className='border-0 bg-tertiary text-center odd:bg-background hover:bg-light-purple hover:bg-opacity-20 transition-colors ease duration-300 text-white font-normal cursor-pointer'>
                             <td colSpan={2} className="pl-4 py-4">
                                 <div className="flex w-full items-center gap-2 overflow-hidden">
                                     <ProfileIcon profile={course.coursePhoto} className="" width={"32px"} height={"32px"} />
                                     <p className='truncate' title={course.courseName}>{course.courseName}</p>
                                 </div>
                             </td>
                             <td className="px-4 py-2 truncate" title={course.courseDescription}>{course.courseDescription}</td>
                             <td className="px-4 py-2">{formatDate(course.createdAt, false)}</td>
                             <td className="px-4 py-2 font-bold text-green-600">{formatCurrency(course.recommendedPrice!)}</td>
                            <td className="px-4 py-2">
                                {course.students.length !== 0 && <div className="flex flex-center">
                                    <OverlappingImages size={25} outline={3.5} ratio={0.25} textSize={10} outlineColor={index % 2 ? 'var(--tertiary)' : 'var(--background)'} images={course.students.map(aud => aud.profile ?? { color: aud.color, fullName: `${aud.firstName} ${aud.lastName}` })} />
                                </div>}
                                {course.students.length === 0 && "No student yet"}
                            </td>
 
                         </tr>
                     )))}
                     {filteredCourses.length === 0 && <tr className='bg-background'><td className='text-center py-4' colSpan={6}>No search results for "<span className='font-bold'>{searchTerm}</span>".</td></tr>}
                 </tbody>
             </table>
         </div>
     </div>
   )
}
