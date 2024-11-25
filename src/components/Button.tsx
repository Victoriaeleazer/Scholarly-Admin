import React from 'react'
import { FaSpinner } from 'react-icons/fa6';

interface props{
    loading?:boolean,
    title:string,
    onClick?:()=> void,
    disabled?:boolean,
    negative?:boolean,
    gradient?:boolean,
    className?:string | undefined,
    type?:"submit" | "reset" | "button" | undefined;
}

export default function Button({className='',loading=false, title, type, gradient=false, onClick, disabled=false, negative=false}:props) {
    if(negative || disabled){
        return (
            <button type={type} className={`cursor-pointer select-none w-full h-[55px] rounded-[15px] font-semibold text-white text-center items-center justify-center inline-flex ${className} ${disabled? 'text-secondary bg-background':'bg-red-600 text-white'}`} disabled={loading || disabled} onClick={onClick}>
                {!loading? title:<FaSpinner className="animate-spin" />}
            </button>
        )
    }

    if(gradient){
        return (
            <button type={type} className={`cursor-pointer select-none w-full h-[55px] rounded-[15px] font-semibold text-white text-center items-center justify-center inline-flex ${className} bg-gradient-to-r from-blue to-purple`}  disabled={disabled || loading} onClick={onClick}>
                {!loading? title:<FaSpinner className="animate-spin" />}
            </button>
        )
    }
  return (
    <button type={type} className={` cursor-pointer select-none w-full h-[55px] rounded-[15px] font-semibold text-white text-center items-center justify-center inline-flex ${className} bg-purple`}  disabled={disabled || loading} onClick={onClick}>
    {!loading? title:<FaSpinner className="animate-spin" />}
    </button>
  )
}
