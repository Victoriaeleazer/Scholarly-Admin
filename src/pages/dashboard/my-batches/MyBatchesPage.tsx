import { useMediaQuery } from '@react-hook/media-query';
import React, { useState } from 'react'
import LottieWidget from '../../../components/LottieWidget';

import noBatchesAnim from '../../../assets/lottie/no-batches.json'
import BatchesList from './BatchesList';

export default function MyBatchesPage() {
    const [batches, setBatches] = useState([]);
    const isPhone = !useMediaQuery('only screen and (min-width: 768px)');

    
    
    const NoBatchesLayout = ()=>(
        <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-2':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>
            <LottieWidget lottieAnimation={noBatchesAnim} className={`w-[40%] h-[40%] object-contain`} />
            <p>You're not taking any batch yet.</p>
        </div>
    )

    // The Layout to show when there batches
    return (
        <div className='w-full h-full bg-transparent'>
            <BatchesList />

        </div>
    );
}
