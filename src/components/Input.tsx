import React, { HTMLInputTypeAttribute, ReactNode, useState } from 'react'
import {Eye, EyeSlash} from 'iconsax-react'

interface props{
    placeholder:string,
    prefix?:ReactNode | string,
    className?: string | undefined,
    type?: HTMLInputTypeAttribute | undefined,
    required?:boolean,
    value?:string,
    password?:boolean,
    error?: string,
    onChange?: (s:string)=> void

}

export default function Input({prefix, placeholder, password=false, error, required, value, onChange, type, className}:props) {
    const [showPassword, setShowPassword] = useState(password || type==='password');

    const ShowButton = ()=>{
        if(showPassword){
            return <EyeSlash onClick={()=>setShowPassword(!showPassword)} className='text-lg text-blue' />
        }
        return <Eye onClick={()=>setShowPassword(!showPassword)} className='text-lg text-blue' />
    }
  return (
    <div className='w-auto gap-1'>
        <div className={`w-full h-fit px-5 select-none py-4 ${className} outline-none flex gap-6 items-center justify-center border-none border-purple border-2 bg-background focus:border rounded-[20px]`}>
            {prefix && <div className='text-[18px] scale-105'>
                {prefix}
                </div>}

            <input 
                className='bg-transparent font-normal text-white focus:outline-none flex flex-1 placeholder:text-secondary'
                required={required}
                placeholder={placeholder}
                type={password || type==='password'? (showPassword?'text':'password'):type}
                value={value}
                onChange={(e)=>{
                    if(onChange){
                        onChange!(e.target.value)
                    }
                }}

            />

            {(password || type==='password') && <ShowButton/>}
        </div>
        {error && <p className='text-red-500 font-bold text-[14px]'><i>{`* ${error?.toLowerCase().trim()}`}</i></p>}
    </div>
    
  )
}
