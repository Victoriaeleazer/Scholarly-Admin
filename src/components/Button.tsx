import React from 'react'
import { FaSpinner } from 'react-icons/fa6';

interface props{
    loading?:boolean,
    title:string,
    onClick?:()=> void,
    disabled?:boolean,
    negative?:boolean,
    gradient?:boolean,
    outlined?: boolean,
    invert?: boolean,
    className?:string | undefined,
    type?:"submit" | "reset" | "button" | undefined;
}

export default function Button({className='', outlined=false, invert=false, loading=false, title, type, gradient=false, onClick, disabled=false, negative=false}:props) {
    if(negative || disabled){
        return (
            <button type={type} className={`cursor-pointer select-none w-full h-[55px] rounded-[15px] font-semibold ${invert? 'text-red-500' :'text-white'} ${invert && outlined? 'border-2 border-red-500 bg-transparent':'border-0'} text-center items-center justify-center inline-flex ${className} ${disabled? 'text-secondary bg-background': invert? 'text-red-500 bg-white bg-opacity-5' : 'bg-red-700 text-white'}`} disabled={loading || disabled} onClick={onClick}>
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
    <button type={type} className={`cursor-pointer select-none w-full h-[55px] rounded-[15px] font-semibold ${invert? 'text-light-purple' :'text-white'} text-center items-center justify-center inline-flex ${className} ${invert && !outlined? 'bg-white bg-opacity-5' : 'bg-purple'} ${invert && outlined? 'outline outline-[3px] text-light-purple outline-purple bg-transparent':'outline-none outline-0'}`}  disabled={disabled || loading} onClick={onClick}>
        {!loading? title:<FaSpinner className="animate-spin" />}
    </button>
  )
}
