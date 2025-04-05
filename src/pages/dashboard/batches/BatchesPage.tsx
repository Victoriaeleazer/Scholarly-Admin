
import { useMediaQuery } from '@react-hook/media-query';
import { Add, ArrowDown2, ArrowRight2 } from 'iconsax-react';
import React, { useRef, useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noBatchesAnim from '../../../assets/lottie/no-batches.json'
import { useBatches } from '../../../provider/BatchesProvider';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import { useAdmin } from '../../../provider/AdminProvider';
import ProfileIcon from '../../../components/ProfileIcon';
import { Course } from '../../../interfaces/Course';
import { User } from '../../../interfaces/User';
import { Days, Months } from '../../../interfaces/Batch';
import { useCourses } from '../../../provider/CoursesProvider';
import { useAdmins } from '../../../provider/AdminsProvider';
import formatCurrency from '../../../utils/NumberFormat';
import { FaCheck } from 'react-icons/fa6';
import { AdminRole } from '../../../interfaces/Admin';
import CheckBox from '../../../components/CheckBox';

export default function BatchesPage() {
    const {batches: cohorts} = useBatches();
    const [dialog, showDialog] = useState(false)
    const [courseDialog, showCourseDialog] = useState(false);
    const [facultyDialog, showFacultyDialog] = useState(false);
    const {admin} = useAdmin();
    const {admins} = useAdmins();
    const cohortNameRef = useRef<HTMLInputElement>(null);
    const cohortRecommendedPriceRef = useRef<HTMLInputElement>(null);
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');


    const [course, selectCourse] = useState<Course | undefined>(undefined)
    const [index, selectIndex] = useState<number | undefined>(undefined)
    const [faculty, selectFaculty] = useState<User | undefined>(undefined)
    const [students, selectStudents] = useState<User[]>([]);
    const [days, selectDays] = useState<Days[]>([]);
    const {courses} = useCourses();

    const allowedDays = [Days.Mon, Days.Tue, Days.Wed, Days.Thur, Days.Fri, Days.Sat];


    const MonthDropdown = ()=>{

    }


    
    
    // The Layout to show there no batches
    const NoCohortsPage = ()=>(
        <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
            <LottieWidget lottieAnimation={noBatchesAnim} className={`w-[40%] h-[40%] object-contain`} />
            <p>There are no cohorts yet in Scholarly.<br />Quickly Create One.</p>
            
        </div>
    )

    // The Layout to show when there batches
    return (
        <div className='w-full h-full'>
            {cohorts.length == 0 && <NoCohortsPage />}


            {/* Select Course Dialog */}
            <Dialog show={courseDialog} zIndex={850} onClose={()=>{showCourseDialog(false); selectIndex(undefined)}} className='w-[500px]'>
                <p className='text-white mb-5 text-[23px] font-semibold self-start'>Select a Course</p>
                <div className='w-full flex mb-5 flex-col gap-4'>
                    {courses.map((course, _index)=>(
                        <div onClick={()=>selectIndex(_index)} className='flex items-center gap-3 select-none cursor-pointer border-secondary pb-4 border-opacity-10 border-b last:border-b-0 last:pb-0'>
                            <ProfileIcon profile={course.coursePhoto} className='object-cover object-center w-[37px] h-[37px]' />
                            <div className='flex flex-col overflow-hidden'>
                                <p className='text-white text-[14px] font-normal truncate'>{course.courseName}</p>
                                <p className='text-[11px] text-secondary font-light truncate'>{course.courseDescription}</p>
                            </div>
                            <div className='flex-1' />
                            <input type='checkbox' checked={index === _index} onChange={(e)=>selectIndex(e.target.checked?_index:undefined)} className='hidden' />
                            <div className={`w-[16px] h-[16px] flex text-white flex-center border-2 rounded ${index=== _index?'bg-purple border-purple' :'bg-transparent border-secondary'}`}>
                                {index === _index && <FaCheck className='text-[8px]' />}
                            </div>
                        </div>
                    ))}
                </div>
                <Button title='Select' disabled={index === undefined} onClick={()=>{
                    selectCourse(courses[index!]);
                    showCourseDialog(false)
                    selectIndex(undefined)
                }} />


            </Dialog>

            {/* Select Faculty Dialog */}
            <Dialog show={facultyDialog} zIndex={850} onClose={()=>{showFacultyDialog(false); selectIndex(undefined)}} className='w-[500px]'>
                <p className='text-white mb-5 text-[23px] font-semibold self-start'>Select a Faculty</p>
                <div className='w-full flex mb-5 flex-col gap-4'>
                    {admins.filter(admin => admin.role === AdminRole.Faculty).map((faculty, _index)=>(
                        <div onClick={()=>selectIndex(_index)} className='flex items-center gap-3 select-none cursor-pointer border-secondary pb-4 border-opacity-10 border-b last:border-b-0 last:pb-0'>
                            <ProfileIcon member={faculty} className='object-cover object-center w-[37px] h-[37px]' />
                            <div className='flex flex-col overflow-hidden'>
                                <p className='text-white text-[14px] font-normal truncate'>{faculty.fullName}</p>
                                <p className='text-[11px] text-secondary font-light truncate'>{faculty.email}</p>
                            </div>
                            <div className='flex-1' />
                            <input type='checkbox' checked={index === _index} onChange={(e)=>selectIndex(e.target.checked?_index:undefined)} className='hidden' />
                            <div className={`w-[16px] h-[16px] flex text-white flex-center border-2 rounded ${index=== _index?'bg-purple border-purple' :'bg-transparent border-secondary'}`}>
                                {index === _index && <FaCheck className='text-[8px]' />}
                            </div>
                        </div>
                    ))}
                </div>
                <Button title='Select' disabled={index === undefined} onClick={()=>{
                    selectFaculty(admins.filter(admin => admin.role === AdminRole.Faculty)[index!]);
                    showFacultyDialog(false)
                    selectIndex(undefined)
                }} />


            </Dialog>

            {/* Create Cohort Dialog */}
            <Dialog show={dialog} onClose={()=>showDialog(false)} cancelable={false} className='flex w-[900px] gap-10'>
                <div className='w-[400px]'>
                    <p className='text-white mb-4 text-[23px] font-semibold self-start'>Create a Cohort</p>

                    <form className='flex flex-col items-center justify-center gap-5 text-left w-full'>
                        {/* Cohort Name */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Cohort Name</p>
                            <input ref={cohortNameRef} placeholder='e.g React September Cohort' required multiple={false} className='w-full bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                        </div>

                        {/* Course */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Select Course</p>
                            <div onClick={()=>showCourseDialog(true)} className='w-full bg-white bg-opacity-[0.02] px-3 py-1.5 cursor-pointer select-none rounded-[10px] h-[45px] text-[14px] flex gap-2 items-center text-white outline-background outline outline-[2.5px] hover:outline-purple'>
                                {course && <ProfileIcon className='h-[26px] aspect-square text-[11.5px]' profile={course.coursePhoto} />}
                                <p className={!course? 'text-secondary font-normal text-[12px]':''}>{course?.courseName ?? "No Course Selected"}</p>
                                <div className='flex flex-1' />
                                <ArrowRight2 size={19} className='text-secondary' />
                            </div>
                        </div>

                        {/* Price */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Set Fee</p>
                            <input list="price" ref={cohortRecommendedPriceRef} placeholder='Rec. price for React is 500,000' required multiple={false} className='w-full bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                            <p className='text-secondary text-[11px]'>* This would be the fee that would be charged to all students undergoing this cohort.</p>
                        </div>

                        {/* Faculty */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Set Faculty</p>
                            <div onClick={()=>showFacultyDialog(true)} className='w-full bg-white bg-opacity-[0.02] cursor-pointer px-3 py-1.5 select-none rounded-[10px] h-[45px] text-[14px] flex gap-2 items-center text-white outline-background outline outline-[2.5px] hover:outline-purple'>
                                {faculty && <ProfileIcon className='h-[26px] aspect-square text-[11.5px]' member={faculty!} />}
                                <p className={!faculty? 'text-secondary font-normal text-[12px]':''}>{faculty?.firstName ?? "No Faculty Selected"}</p>
                                <div className='flex flex-1' />
                                <ArrowRight2 size={19} className='text-secondary' />
                            </div>
                            <p className='text-secondary text-[11px]'>* The faculty staff that will teach in the cohort</p>
                        </div>

                         {/* Start Date */}
                         <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Set Start Date</p>
                            <div className='flex w-full gap-4'>
                                <input required inputMode='numeric' placeholder='Day' multiple={false} className='w-[55px] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                                <input required list='months' multiple={false} placeholder='Month' className='w-[50%] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple'/>
                                <input required list='years' multiple={false} placeholder='Year' className='w-[30%] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />

                            </div>
                        </div>

                        {/* End Date */}
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-secondary text-[13px] raleway'>Set End Date</p>
                            <div className='flex w-full gap-4'>
                                <input required inputMode='numeric' placeholder='Day' multiple={false} className='w-[55px] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                                <input required list='months' multiple={false} placeholder='Month' className='w-[50%] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />
                                <input required list='years' multiple={false} placeholder='Year' className='w-[30%] bg-white bg-opacity-[0.02] px-3 py-3 rounded-[10px] text-[14px] placeholder:text-secondary text-white outline-background outline outline-[2.5px] focus:outline focus:outline-purple' />

                            </div>
                        </div>

                        <datalist id="months">
                            {Object.keys(Months).filter(_month => isNaN(Number(_month))).map((month, index)=>(
                                <option key={index} value={month}/>
                            ))}
                        </datalist>

                        <datalist id="price">
                            {course && <option>{formatCurrency(course?.recommendedPrice!)}</option>}
                         </datalist> 

                        <datalist id="years">
                            <option>{new Date().getFullYear()}</option>
                            <option>{new Date().getFullYear()+1}</option>
                        </datalist>

                        <Button className='mt-2' title={'Create Cohort'} type='submit'  />
                    </form>

                    
                </div>
                <div className='flex flex-col flex-1 text-white px-4 pt-4 bg-black rounded-[12px]'>
                    <p className='text-[18px] mb-3 font-semibold'>Select Cohort's Lecture Days</p>
                    <div className='w-full mb-10 grid grid-cols-2 gap-y-2'>
                        {allowedDays.map(day => (
                            <div onClick={()=>{
                                if(days.includes(day)){
                                    selectDays(days.filter(_day => _day !==day));
                                    return;
                                }
                                selectDays(prevDays => [...prevDays, day])
                            }} className='flex gap-2 select-none cursor-pointer items-center'>
                                <p className='text-secondary text-[14px] w-[127px] font-light'>{day}</p>
                                <CheckBox size={14} checked={days.includes(day)} onChanged={checked => {
                                    if(checked){
                                        selectDays(days.filter(_day => _day !==day));
                                        return;
                                    }
                                    selectDays(prevDays => [...prevDays, day])
                                }}   />

                            </div>
                        ))}

                    </div>

                    <p className='text-[18px] mb-3 font-semibold'>Select Students</p>
                    <div className={`w-full min-h-[100px] flex ${students.length === 0? 'flex-center': 'flex-wrap'}`}>
                        {students.length === 0 && <p className='flex text-secondary font-light text-[12px]'>Students you add will appear here</p>}
                    </div>
                    <div className="w-full bg-tertiary text-center cursor-pointer px-3 py-1.5 select-none rounded-[10px] h-[40px] text-[13px] flex gap-2 flex-center text-white outline-background outline outline-[2px]">
                        <p>{students.length === 0? "Add Student": "Add more students"}</p>
                    </div>

                </div>
            </Dialog>

            <Fab onClick={()=>showDialog(true)}>
                <Add size={25} />
            </Fab>

        </div>
        
    );
}
