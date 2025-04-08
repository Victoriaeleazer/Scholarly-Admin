import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react'

interface props{
    children?: ReactNode,
    className?: string | undefined,
    isMultiple?: boolean,
    title?: string,
    style?: CSSProperties,
    onClick? : MouseEventHandler
}

export default function Fab({children, style, title, isMultiple: multiple, onClick = ()=>{}, className}: props) {
    const isMultiple = multiple && React.Children.count(children) > 1;
  return (
    <div title={title} onClick={onClick} style={{backgroundColor: 'var(--purple)', ...style}} className={`select-none cursor-pointer allow-discrete w-fit h-fit shadow-lg text-white fixed z-[5] bottom-8 right-8 ${isMultiple? 'rounded-[25px] px-6 py-4': 'rounded-circle p-4'} flex items-center justify-center shadow-black hover:bg-background transition-all duration-500 ease ${className}`}>{children}</div>
  )
}
