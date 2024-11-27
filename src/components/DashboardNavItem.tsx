import React from 'react'
import { DashboardNav } from '../interfaces/DashboardNav'
import { Link } from 'react-router'

interface props{
    selected?:boolean,
    navItem:DashboardNav
}
export default function DashboardNavItem({selected=false, navItem}:props) {
  return (
    <Link to={navItem.link}  className={`w-full select-none h-fit rounded-[10px] overflow-hidden p-3.5 flex gap-3 items-center transition-all duration-500 ease-in-out ${selected? 'bg-purple text-white':'bg-transparent text-secondary'}`}>
        <div className={`text-[27px]`}>{selected? (navItem.selectedIcon ?? navItem.icon):navItem.icon}</div>
        <p className='font-semibold text-[16px] whitespace-nowrap text-ellipsis'>{navItem.name}</p>
    </Link>
  )
}
