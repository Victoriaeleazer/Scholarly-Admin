import React from 'react'
import { FaCheck } from 'react-icons/fa6'

interface props {
    size?: number,
    checked?: boolean,
    onChanged?: (value: boolean) => void
}

export default function CheckBox({size=16, checked=false, onChanged=()=>{}}:props) {
  return (
   <>
   <input type='checkbox' checked={checked} onChange={(e)=>onChanged(e.target.checked)} className='hidden' />
    <div style={{width:size, height:size}} className={`flex text-white flex-center border-2 rounded ${checked?'bg-purple border-purple' :'bg-transparent border-secondary'}`}>
        {checked && <FaCheck className='text-[8px]' />}
    </div>
   </>
  )
}
