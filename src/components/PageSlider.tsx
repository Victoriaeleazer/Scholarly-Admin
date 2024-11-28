import React, { ReactNode, useEffect, useState } from 'react'

interface props{
    className?: string | undefined,
    children?:ReactNode,
    currentIndex?:number,
    slideDuration?:number,
    endless?:boolean,
    onChange?: (index:number) => void
}

export default function PageSlider({className='',currentIndex=0, slideDuration=1000, endless=false, onChange=()=>{}, children}:props) {

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
        <div className={`flex h-full items-center transition-transform ease-out gap-2 duration-500`} style={{transform: `translateX(-${index * 100}%)`, transitionDuration:`${slideDuration}ms`, transitionTimingFunction:'ease'}}>
            {React.Children.map(children, (child)=> <div className='flex-grow-0 flex-shrink-0' style={{flexBasis:'100%'}}>{child}</div>)}
        </div>

    </div>
  )
}
