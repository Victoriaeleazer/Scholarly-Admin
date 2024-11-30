import { useMediaQuery } from '@react-hook/media-query';
import { Add } from 'iconsax-react';
import React, { useState } from 'react'
import Fab from '../../../components/Fab';
import LottieWidget from '../../../components/LottieWidget';

import noStaffsAnim from '../../../assets/lottie/no-staffs.json'

export default function StaffsPage() {
    const [staffs, setStaffs] = useState([]);
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no staffs
    if(staffs.length<=0){
        return (
            <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
                <LottieWidget lottieAnimation={noStaffsAnim} className={`w-[40%] h-[40%] object-contain`} />
                <p>There are no staffs (admins) yet in Scholarly.</p>
            </div>
        )
    }

    // The Layout to show when there staffs
    return (
        <div></div>
    );
}
