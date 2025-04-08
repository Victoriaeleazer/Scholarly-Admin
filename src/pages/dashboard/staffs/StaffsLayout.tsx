import React from 'react'
import { Outlet } from 'react-router'

export default function StaffsLayout() {


  return (
    <div className='w-full h-full bg-transparent'>
        <Outlet />
    </div>
  )
}
