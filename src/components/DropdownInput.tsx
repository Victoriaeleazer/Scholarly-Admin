import React, { HTMLInputTypeAttribute, ReactNode, useState } from 'react'
import {Eye, EyeSlash} from 'iconsax-react'

interface props{
    placeholder:string,
    prefix?:ReactNode | string,
    className?: string | undefined,
    id?:string,
    options:string[]
    required?:boolean,
    value?:string,
    error?: string | null,
    onChange?: (s:string)=> void

}

export default function DropDownInput({prefix, id, placeholder, options, error, required, value, onChange=()=>{}, className}:props) {
  return (
    <div className='w-auto gap-1 flex flex-col items-start'>
        <div className={`w-full h-fit px-5 select-none py-4 ${className} outline-none flex gap-6 items-center justify-center border-none border-purple border-2 bg-background focus:border rounded-[20px]`}>
            {prefix && <div className='text-[18px] scale-105'>
                {prefix}
                </div>}

            <select
                id={id}
                className={`bg-transparent autofill:bg-background font-normal focus:outline-none flex flex-1 placeholder:text-secondary ${value === '' || !options.includes(value ?? '') || !value? 'text-secondary' :'text-white'}`}
                required={required}
                value={value}
                onChange={(e)=>onChange(e.target.value.trim())}>
                    {[
                        <option className='bg-black text-secondary' value=''>{placeholder}</option>,
                        ...options.map(option => <option className='bg-black text-white' value={option}>{option.charAt(0).toUpperCase() + option.substring(1)}</option>)
                    ]}
                </select>
        </div>
        <p className={`text-red-500 font-bold ${error?'text-[14px]':'text-[0px]'} transition-all ease-in-out`}><i>{`* ${error?.toLowerCase().trim()}`}</i></p>
    </div>
    
  )
}
