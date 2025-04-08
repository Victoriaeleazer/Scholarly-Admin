import { useMediaQuery } from '@react-hook/media-query';
import React, { useState } from 'react'
import LottieWidget from '../../../components/LottieWidget';
import noMenteesAnim from '../../../assets/lottie/no-students.json'

export default function MenteesPage() {
    const [mentees, setMentees] = useState([]);
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no mentees
    if(mentees.length<=0){
        return (
            <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
                <LottieWidget lottieAnimation={noMenteesAnim} className={`w-[40%] h-[40%] object-contain`} />
                <p>You don't have any mentees yet<br />Mentees will join soon 😉</p>
            </div>
        )
    }

    // The Layout to show when there mentees
    return (
        <div></div>
    );
}
