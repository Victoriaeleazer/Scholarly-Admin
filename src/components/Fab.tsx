import React, { MouseEventHandler, ReactNode } from 'react'

interface props{
    children?: ReactNode,
    className?: string | undefined,
    onClick? : MouseEventHandler
}

export default function Fab({children, onClick = ()=>{}, className}: props) {
    const isMultiple = React.Children.count(children) > 1;
  return (
    <div onClick={onClick} className={`select-none cursor-pointer w-fit h-fit shadow-lg bg-purple text-white fixed z-[5] bottom-8 right-8 ${isMultiple? 'rounded-[25px] px-6 py-4': 'rounded-circle p-4'} flex items-center justify-center shadow-black hover:bg-tertiary transition-colors duration-200 ease ${className}`}>{children}</div>
  )
}
