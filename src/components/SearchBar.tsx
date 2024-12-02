import { SearchNormal } from 'iconsax-react'
import React from 'react'

interface props{
    className?:string
    placeholder?: string,
    onChange?:(s:string) => void

}

export default function SearchBar({className='', placeholder='Search', onChange = ()=>{}}:props) {
  return (
    <div className={`w-full flex gap-4 items-center justify-center rounded-[10px] bg-white bg-opacity-[0.05] px-3 py-2.5 overflow-hidden ${className}`}>
        <SearchNormal size={18} />
        <input placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} aria-multiline={false} className='flex flex-1 bg-transparent focus:bg-transparent placeholder:text-secondary text-white focus:outline-none focus:border-none' />
    </div>
  )
}
