import React, { HTMLInputTypeAttribute, ReactNode, useState } from 'react'
import {Eye, EyeSlash} from 'iconsax-react'

interface props{
    placeholder:string,
    prefix?:ReactNode | string,
    className?: string | undefined,
    id?:string,
    type?: HTMLInputTypeAttribute | undefined,
    required?:boolean,
    value?:string,
    password?:boolean,
    error?: string | null,
    onChange?: (s:string)=> void

}

export default function Input({prefix, id, placeholder, password=false, error, required, value, onChange, type, className}:props) {
    const [showPassword, setShowPassword] = useState(password || type==='password');

    const [focus, setFocus] = useState(false)

    const ShowButton = ()=>{
        if(showPassword){
            return <EyeSlash onClick={()=>setShowPassword(!showPassword)}/>
        }
        return <Eye onClick={()=>setShowPassword(!showPassword)}/>
    }
  return (
    <div className='w-auto gap-1 flex flex-col items-start'>
        <div className={`w-full h-fit px-5 select-none py-4 ${className} outline-none flex gap-6 items-center justify-center border-none border-purple border-2 bg-background focus:border rounded-[20px]`}>
            {prefix && <div className='text-[18px] scale-105'>
                {prefix}
                </div>}

            <input
                id={id}
                className='bg-transparent autofill:bg-background font-normal text-white focus:outline-none flex flex-1 placeholder:text-secondary'
                required={required}
                placeholder={placeholder}
                type={password || type==='password'? (showPassword?'text':'password'):type}
                value={value}
                onChange={(e)=>{
                    if(onChange){
                        onChange!(e.target.value.trim())
                    }
                }}

            />

            {(password || type==='password') && <div className='text-[18px] text-blue'>
                <ShowButton/>
                </div>}
        </div>
        <p className={`text-red-500 font-bold ${error?'text-[14px]':'text-[0px]'} transition-all ease-in-out`}><i>{`* ${error?.toLowerCase().trim()}`}</i></p>
    </div>
    
  )
}
