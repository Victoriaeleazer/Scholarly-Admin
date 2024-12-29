import { Outlet } from 'react-router'
import ChannelPage from './ChannelPage'
import React from 'react'

export default function ChannelLayout() {

  return (
    <div className='w-full h-full text-white p-6 pt-0 overflow-hidden flex gap-6 items-center justify-center'>
        <ChannelPage />

        <div className='flex flex-1 h-full'>
            <Outlet/>
        </div>
    </div>
  )
}
