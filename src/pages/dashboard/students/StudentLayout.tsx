import React from 'react'
import { Outlet } from 'react-router'

export default function StudentLayout() {
  return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
  )
}
