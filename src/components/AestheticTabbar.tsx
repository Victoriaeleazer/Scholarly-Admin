import React, { CSSProperties } from 'react'

interface props{
    className?: string,
    style?: CSSProperties,
    tabs: string[],
    onSelectTab: (tab?:string, index?: number) => void,
    index?: number
}


export default function AestheticTabbar(tabProps: props) {
    const {className, tabs, index=0, style, onSelectTab} = tabProps;
  return (
    <div style={{
            '--selected-tab-bg-color': 'var(--tertiary)',
            '--selected-tab-text-color': 'white',
            '--unselected-tab-text-color': 'var(--secondary)' ,
            '--selected-tab-border-radius': '14px',
            ...style} as Record<string, any>}
        className={`w-full rounded-2xl h-[50px] bg-black flex box-border relative ${className} overflow-hidden`}>
        <div className='absolute top-1 bottom-1 left-1 right-1 z-1 overflow-hidden'>
            <div style={{width: `${100 / tabs.length}%`, transform: `translateX(${index * 100}%)` , backgroundColor: 'var(--selected-tab-bg-color)', borderRadius: 'var(--selected-tab-border-radius)'}} className='h-full cursor-pointer select-none transition-transform duration-700 ease-in' />

        </div>

        <div className='w-full h-full z-10 flex flex-center bg-transparent'>
            {tabs.map((tab, _index)=>(
                <div onClick={()=>onSelectTab(tab, _index)} style={{color: `var(--${index === _index? 'selected':'unselected'}-tab-text-color)`}} className='flex flex-center flex-1 open-sans font-medium text-center cursor-pointer select-none'>{tab}</div>
            ))}
        </div>
    </div>
  )
}
