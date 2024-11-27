import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import DashboardNavItem from '../../components/DashboardNavItem'
import { HambergerMenu, Home2, Calendar, Information, Messages, Personalcard, ShieldTick, BookSaved, Setting, Book, Message, EmojiHappy, ArrowDown2 } from 'iconsax-react'
import { Admin, AdminRole } from '../../interfaces/Admin';
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage';
import { useMediaQuery } from '@react-hook/media-query';

export default function DashboardLayout() {

  const currentLocation = useLocation();

  const [refreshState, setRefresh] = useState("");

  const [collapsed, setCollapsed] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [admin, setAdmin] = useState<Admin | null>(null);

  const isPhone = !useMediaQuery('only screen and (min-width: 767px)')

  useEffect(()=>{
    if(hasAdminUserData()){
      setAdmin(getAdminUserData());
    }
  }, [])

  useEffect(()=>{
    /// In order to make sure that when the user clicks or navigates
    /// On a phone screen size, the drawer is closed immediately
    setMenuOpen(false);
  }, [currentLocation.pathname])


  const facultyMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/my-batches')} navItem={{icon:<BookSaved />, selectedIcon:<BookSaved variant='Bold'/>, link:'./my-batches', name:'My Batches'}} />
    </>
  );

  const managerOrCouselorMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/courses')} navItem={{icon:<Book />, selectedIcon:<Book variant='Bold'/>, link:'./courses', name:'Courses'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/batches')} navItem={{icon:<BookSaved />, selectedIcon:<BookSaved variant='Bold'/>, link:'./batches', name:'Batches'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/feedbacks')} navItem={{icon:<Information/>, selectedIcon:<Information variant='Bold' />, link:'./feedbacks', name:'Feedbacks'}} />  
    </>
  )

  const counselorMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/mentees')} navItem={{icon:<EmojiHappy />, selectedIcon:<EmojiHappy variant='Bold'/>, link:'./mentees', name:'My Mentees'}} />
    </>
  )

  const managerMenus = ()=>(
    <>
      <DashboardNavItem selected={currentLocation.pathname.includes('/staffs')} navItem={{icon:<ShieldTick />, selectedIcon:<ShieldTick variant='Bold'/>, link:'./staffs', name:'Staffs'}} />
    </>
  )

  const sideBar = ()=>(
    <div className={`h-full bg-tertiary left-0 top-0 text-white px-5 py-2 flex flex-col items-center gap-3 transition-all duration-[1000ms] ease-in-out overflow-hidden ${isPhone? 'w-[55vw] absolute z-10 ':'z-0'} ${isPhone? (menuOpen?'left-0':'-left-[70vw]')  : (collapsed? 'w-[90px]' : 'w-[20%]')}`} style={{transitionTimingFunction:'ease'}}>

      <div className='w-full flex gap-4 justify-start p-3 items-center text-white font-extrabold overflow-hidden'>
        <div onClick={()=>{
          if(isPhone){
            setMenuOpen(false);
            return;
          }
          setCollapsed(!collapsed);
        }} className='cursor-pointer transition-transform duration-500 ease-in-out' style={{transform:collapsed? 'rotate(-180deg)':'rotate(0deg)'}}><HambergerMenu size={30} /></div>
        <p className='select-none text-[27px] bg-gradient-to-r from-blue via-blue to-purple bg-clip-text text-transparent text-nowrap'>Scholarly</p>
      </div>

      <DashboardNavItem selected={currentLocation.pathname.endsWith('dashboard/') || currentLocation.pathname.endsWith('dashboard')} navItem={{icon:<Home2/>, selectedIcon:<Home2 variant='Bold'/>, link:'.', name:'Dashboard'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/announcements')} navItem={{icon:<Message/>, selectedIcon:<Message variant='Bold'/>, link:'./announcements', name:'Announcements'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/events')} navItem={{icon:<Calendar/>, selectedIcon:<Calendar variant='Bold'/>, link:'./events', name:'Events'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/students')} navItem={{icon:<Personalcard/>, selectedIcon:<Personalcard variant='Bold'/>, link:'./students', name:'Students'}} />
      <DashboardNavItem selected={currentLocation.pathname.includes('/channels')} navItem={{icon:<Messages/>, selectedIcon:<Messages variant='Bold'/>, link:'./channels', name:'Chats'}} />

      {/* Varying Menus. (Menus that vary based on User Roles) */}

      {/* For Faculty */}
      {admin?.role === AdminRole.Faculty && facultyMenus()}

      {/* For Counselors */}
      {admin?.role == AdminRole.Counselor && counselorMenus()}

      {/* For Managers */}
      {admin?.role == AdminRole.Manager && managerMenus()}

      {/* For Menus that apply to both managers and counselors */}
      {admin?.role !== AdminRole.Faculty && managerOrCouselorMenus()}         
      

      <DashboardNavItem selected={currentLocation.pathname.includes('/settings')} navItem={{icon:<Setting />, selectedIcon:<Setting variant='Bold'/>, link:'./settings', name:'Settings'}} />
    </div>
  )


  return (
    <div className='flex w-full h-full overflow-hidden relative'>
        {/* Drawer. We want it only to show if the browser is not in a phone screen size */}
        {sideBar()}

        {/* Nav bar & Page (Outlet) */}
        <div key={currentLocation.pathname} className='flex flex-col items-start flex-1 bg-transparent h-full'>
          <div className='w-full flex items-center justify-end px-6 py-5 gap-8'>
            {isPhone && <div onClick={()=>{
              setCollapsed(false);
              setMenuOpen(!menuOpen)
            }} className='cursor-pointer text-white transition-transform duration-500 ease-in-out' style={{transform:menuOpen? 'rotate(-180deg)':'rotate(0deg)'}}><HambergerMenu size={30} /></div>}

            {/* Spacing to prevent the drawer icon at the start */}
            <div className='flex flex-1'/>
            <div className='w-fit flex items-center justify-center gap-4'>
              <img className='rounded-circle w-10 h-10 bg-tertiary object-cover' src={admin?.profile ?? 'P'} alt="Profile Photo" />
              <ArrowDown2 className='text-secondary' size={18} />
            </div>
          </div>
          <Outlet />   
        </div>
    </div>
  )
}
