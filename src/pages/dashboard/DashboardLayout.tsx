import React from 'react'
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <div className='flex w-full h-full'>
        <div className="w-[10%] bg-secondary text-white flex flex-col gap-4">
            <p>Hello</p>
            <p>Channel</p>
            <p>Hi</p>
        </div>
        <div className='flex flex-1 bg-transparent'>
            <Outlet />   
        </div>
    </div>
  )
}
