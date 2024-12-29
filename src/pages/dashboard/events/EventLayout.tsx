import React from 'react'
import { Outlet } from 'react-router'

export default function EventLayout() {
  return (
    <div className='w-full h-full '>
        
      <Outlet/>
    </div>
  )
}
