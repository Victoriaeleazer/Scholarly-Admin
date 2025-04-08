import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React, { useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noStudentsAnim from '../../../assets/lottie/no-students.json'
import { useStudents } from '../../../provider/StudentsProvider';
import StudentsList from './StudentsList';

export default function StudentsPage() {
    const {students} = useStudents();
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no students
    const NoStudentsLayout = ()=>(
        <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
            <LottieWidget lottieAnimation={noStudentsAnim} className={`w-[40%] h-[40%] object-contain`} />
            <p>There are no students yet in Scholarly.<br />I'm sure you're eager to see them 😉</p>
        </div>
    )

    // The Layout to show when there students
    return (
        <div className='w-full h-full bg-transparent'>
            {students.length === 0 && <NoStudentsLayout />}
            {students.length >0 && <StudentsList />}
        </div>
    );
}
