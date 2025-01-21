import React, { CSSProperties } from 'react'
import { Member } from '../interfaces/Member';
import { Admin } from '../interfaces/Admin';

interface props{
    width: string | number,
    height: string | number,
    className?: string,
    style?: CSSProperties,
    member?: Member | Admin,
    profile?: string,
}

export default function ProfileIcon(profileProps: props) {

    const {width, height, className, member, profile, style} = profileProps;

    
  return (
    <div style={{width, height, backgroundColor: member?.color, ...style}} className={`rounded-circle overflow-hidden flex flex-center text-white text-center whitespace-nowrap open-sans font-bold ${className}`}>
        {profile && <img src={profile} className='w-full h-full object-cover object-center' />}
        {!profile && <p className='text-[100%]'>{member?.firstName.charAt(0).toUpperCase() + "" + member?.lastName.charAt(0).toUpperCase()}</p>}
    </div>
  )
}
