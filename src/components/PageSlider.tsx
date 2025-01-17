import React, { LegacyRef, ReactNode, useEffect, useState } from 'react'

interface props{
    className?: string | undefined,
    children?:ReactNode,
    /**
     * The current index of the page intended to be viewed
     */
    currentIndex?:number,
    ref?: LegacyRef<HTMLDivElement>,
    /**
     * The slide duration of the page slider
     */
    slideDuration?:number,
    /**
     * Whether the PageSlider would be scrollable or unscrollable.
     * Or rather, if you want the @param PageSlider to take up the full height of the parent or not.
     * 
     * Setting @param exactSizing to true makes it unscrollable
     */
    exactSizing?:boolean,
    /**
     * @deprecated If you want the slider to be endless
     */
    endless?:boolean,

    /**
     * How you want the pages in the page slider to be aligned.
     */
    alignPages?:'start' | 'center' | 'end'
    /**
     * The gap between the pages
     */
    gap?:string | undefined,

    /**
     * A callback that is invoked everytime a page or rather, the @param currentIndex is changed
     * @param index the index of the page that will be viewed after the callback.
     * @returns nothing
     */
    onChange?: (index:number) => void
}

/**
 * Synonmous to a Tab View, The @function PageSlider is an element that holds many views (passed in as it's @param children)
 * and exposes only the currently viewed page gotten from the @param currentIndex hiding the rest.
 * Transition durations as well as the gap between children can be specified through the @param gap and @param slideDuration
 * @author Teninlanimi Taiwo
 */
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
