import { useMediaQuery } from '@react-hook/media-query';
import React, { useState } from 'react'
import LottieWidget from '../../../components/LottieWidget';
import noMenteesAnim from '../../../assets/lottie/no-students.json';
import MenteesList from './MenteesList'; 
import Fab from '../../../components/Fab';
import { Add } from 'iconsax-react';
import Dialog from '../../../components/Dialog';
import { useMentees } from '../../../provider/MenteesProvider';

export default function MenteesPage() {
    const {mentees} = useMentees();
    const [popup, showPopup] = useState(false);
    const [menteeName, setMenteeName] = useState('');
    const [menteeDescription, setMenteeDescription] = useState('');
    const [menteeDateTime, setMenteeDateTime] = useState('');
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    // The Layout to show there no mentees
    const NoMenteesLayout = () =>{
        return (
            <>
                <LottieWidget lottieAnimation={noMenteesAnim} className={`w-[40%] h-[40%] object-contain`} />
                <p>You don't have any mentees yet<br />Mentees will join soon 😉</p>
            </>
        )
    }


    // The Layout to show when there mentees
    return (
        <div className={`w-full h-full bg-transparent items-center justify-center flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} relative`}>
            {mentees.length === 0 && <NoMenteesLayout />}
            
            {mentees.length > 0 && <MenteesList />}

        <Dialog 
         show={popup}
         cancelable={false}
         onClose={() => showPopup(false)}
         className="flex flex-col items-center justify-center gap-4 text-left w-[400px]"
         >

        </Dialog>


            {/* <Fab onClick={()=>showPopup(true)} className='absolute shadow-sm bottom-5 right-5'>
                <Add size={25} />
            </Fab> */}
        </div>
    )
}
function setMenteeName(arg0: string): void {
    throw new Error('Function not implemented.');
}
