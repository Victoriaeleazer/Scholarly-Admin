import React, { ReactNode, useEffect, useState } from 'react'

interface props{
    children?: ReactNode,
    className?: string | undefined,
    delay?:number,
    displacement?:number,
    slideDirection?: 'up' | 'down' | 'left' | 'right'
}
export default function FadeSlideUp({children, delay = 1500, slideDirection='up', displacement=100, className}: props) {
    const [show, setShow] = useState(false);

    /// Animate the element(s) up
    useEffect(()=>{
        const set = setTimeout(()=>setShow(true), delay);

        return ()=> clearTimeout(set);
    }, []);

    const originTransform = ()=>{
        if(slideDirection === 'up'){
            return `translateY(${displacement}px)`
        }

        if(slideDirection === 'down'){
            return `translateY(-${displacement}px)`
        }

        if(slideDirection === 'left'){
            return `translateX(${displacement}px)`
        }
        

        return `translateX(-${displacement}px)`;
    }

    // const distinationTransform = ()=>{
    //     if(slideDirection === SlideDirection.Up){
    //         return `translateY(0px)`
    //     }

    //     if(slideDirection === SlideDirection.Down){
    //         return `translateY(0px)`
    //     }

    //     if(slideDirection === SlideDirection.Left){
    //         return `translateX(0px)`
    //     }
        

    //     return `translateX(0px)`;
    // }


  return (
    <div className={`${className} transition-all duration-1000 ease ${show?'opacity-100':'opacity-0'}`} style={{transform:show? 'none':originTransform()}}>{children}</div>
  )
}
