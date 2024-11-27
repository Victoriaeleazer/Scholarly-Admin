import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import DashboardNavItem from '../../components/DashboardNavItem'
import { HambergerMenu, Home2, Calendar, Information, Messages, Personalcard, ShieldTick, BookSaved, Setting, Book, Message, EmojiHappy, ArrowDown2 } from 'iconsax-react'
import { Admin, AdminRole } from '../../interfaces/Admin';
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage';

export default function DashboardLayout() {

  const currentLocation = useLocation();

  const [refreshState, setRefresh] = useState("");

  const [collapsed, setCollapsed] = useState(false);

  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(()=>{
    if(hasAdminUserData()){
      setAdmin(getAdminUserData());
    }
  }, [])

  useEffect(()=>{
    setRefresh(currentLocation.pathname);
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


  return (
    <div className='flex w-full h-full overflow-hidden'>
        <div className={`${collapsed? 'w-[90px]' : 'w-[20%]'} bg-tertiary text-white px-5 py-2 flex flex-col items-center gap-3 transition-all duration-[1000ms] ease-in-out`} style={{transitionTimingFunction:'ease'}}>

            <div className='w-full flex gap-4 justify-start p-3 items-center text-white font-extrabold overflow-hidden'>
              <div onClick={()=> setCollapsed(!collapsed)} className='cursor-pointer transition-transform duration-500 ease-in-out' style={{transform:collapsed? 'rotate(-180deg)':'rotate(0deg)'}}><HambergerMenu size={30} /></div>
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
        <div key={currentLocation.pathname} className='flex flex-col items-start flex-1 bg-transparent h-full'>
          <div className='w-full  flex items-center justify-end p-6 gap-8'>
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
