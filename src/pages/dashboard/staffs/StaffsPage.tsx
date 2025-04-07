import { useMediaQuery } from '@react-hook/media-query';
import React, { useState } from 'react'
import LottieWidget from '../../../components/LottieWidget';
import noStaffsAnim from '../../../assets/lottie/no-staffs.json'
import { Admin } from "../../../interfaces/Admin";
import StaffsList from './StaffsList';

export default function StaffsPage() {
    const [staffs, setStaffs] = useState<Admin[]>([]);
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no staffs
    const NoStaffsPage = ()=>(
      <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
        <LottieWidget lottieAnimation={noStaffsAnim} className={`w-[40%] h-[40%] object-contain`} />
        <p>There are no staffs yet in Scholarly.</p>
      </div>
    )

    // The Layout to show when there staffs
    return (
      <div className='w-full h-full bg-transparent'>
        {staffs.length === 0 && <NoStaffsPage />}

        {staffs.length !== 0 && <StaffsList />}

      </div>
    );
}