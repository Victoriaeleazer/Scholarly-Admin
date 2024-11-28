import React from 'react';
import Fab from '../../../components/Fab';
import { Add } from 'iconsax-react';

import { useMediaQuery } from '@react-hook/media-query';

export default function AnnouncementPage() {

  const isPhone = !useMediaQuery('only screen and (min-width: 768px)');
  return (
    <div className={`w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center ${isPhone?'gap-3':'gap-10'} overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative`}>

        <img className='w-[40%] h-[40%] object-contain' src={'/images/no-announcements.png'} alt="" />
        <p>There are no announcements yet.<br />You can create one.</p>
        <Fab>
            <Add size={25} />
        </Fab>
    </div>
  )
}
