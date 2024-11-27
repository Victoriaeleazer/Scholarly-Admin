import React, { useEffect, useState } from 'react'
import FadeSlideUp from '../../components/FadeSlideUp'
import { Admin } from '../../interfaces/Admin'
import { getAdminUserData, hasAdminUserData } from '../../services/user-storage'
import { useNavigate } from 'react-router'

export default function DashboardPage() {
  const [admin, setAdmin] = useState<Admin | null>(null)

  const navigate = useNavigate();

  // We initialize the admin.
  // If the admin data isn't stored we redirect to the login page
  useEffect(()=>{
    if(hasAdminUserData()){
      setAdmin(getAdminUserData())
      return;
    }
    navigate('../login', {replace:true})

  }, [])

  if(!admin){
    return (<p></p>);
  }
  return (
    <div className='text-white bg-transparent px-6 py-8 w-full h-fit overflow-x-hidden overflow-y-scroll scholarly-scrollbar'>
      <FadeSlideUp className='select-none font-light text-4xl'>Welcome, {admin?.role.charAt(0).toUpperCase() + admin?.role.substring(1)} <span className='font-extrabold'>{admin?.fullName}</span> </FadeSlideUp>
    </div>
  )
}
