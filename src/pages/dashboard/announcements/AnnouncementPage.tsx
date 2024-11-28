import React from 'react'
import Fab from '../../../components/Fab'
import { Add } from 'iconsax-react'

import noAnnouncementsImg from '../../../assets/images/no-announcements.png';

export default function AnnouncementPage() {
  return (
    <div className='w-full h-full bg-transparent items-center justify-center px-6 py-8 flex flex-col text-white text-center gap-10 overflow-x-hidden overflow-y-scroll scholarly-scrollbar relative'>

        <img className='w-[40%] h-[40%] object-contain' src={noAnnouncementsImg} alt="" />
        <p>There are no announcements yet.<br />You can create one.</p>


        <Fab>
            <Add size={25} />
        </Fab>
    </div>
  )
}
