import React, { LegacyRef, ReactNode, useEffect, useState } from 'react'

interface props{
    className?: string | undefined,
    children?:ReactNode,
    currentIndex?:number,
    ref?: LegacyRef<HTMLDivElement>,
    slideDuration?:number,
    exactSizing?:boolean,
    endless?:boolean,
    alignPages?:'start' | 'center' | 'end'
    gap?:string | undefined,
    onChange?: (index:number) => void
}

export default function PageSlider({className='', ref, alignPages='center',currentIndex=0, exactSizing=false, slideDuration=1000,gap='32px', endless=false, onChange=()=>{}, children}:props) {

    const [index, setIndex] = useState(currentIndex);

    // const slides = children? React.Children.count(children): 0;

    // function next(){
    //     setIndex(curr => curr === slides-1? (endless? curr : 0) : curr+1);
    // }

    // function back(){
    //     setIndex(curr => curr === 0? (endless? slides-1 : curr) : curr-1);
    // }
    /// To always invoke the onChange Callback
    useEffect(()=>{

        if(currentIndex != index){
            setIndex(currentIndex)
            onChange(currentIndex);
        }
    },[currentIndex])

  return (
    <div className={`w-full h-full ${className} overflow-x-hidden relative`}>
        <div ref={ref} className={`flex h-full items-center transition-transform ease-out duration-500`} style={{gap:gap,transform: `translateX(${index==0? `-${index * 100}%`: `calc(-${index * 100}% - ${gap})`})`, transitionDuration:`${slideDuration}ms`, transitionTimingFunction:'ease', alignItems:alignPages}}>
            {React.Children.map(children, (child)=> <div className={`flex-grow-0 flex-shrink-0 ${exactSizing?'h-full':'h-fit'}`} style={{flexBasis:'100%'}}>{child}</div>)}
        </div>

    </div>
  )
}
