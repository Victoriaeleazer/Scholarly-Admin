import React from "react";
import { ReactNode } from "react";
import {FaPlus, FaX} from 'react-icons/fa6'

interface props{
    className?: string,
    zIndex?: number,
    show?:boolean,
    animType?: 'slide-down' | 'popin',
    negative?:boolean,
    onClose?:()=>void,
    discrete?:boolean,
    cancelable?:boolean,
    children?:ReactNode
}

export default function Dialog({show=false, zIndex=800, discrete=true, negative=false, animType='popin', onClose, cancelable=onClose?true:false, className='', children}:props){


    return (
        <div style={{transitionBehavior:discrete? 'allow-discrete':'normal', zIndex}} onClick={cancelable?(e)=>{
            if(onClose){
                e.stopPropagation();
                onClose();
            }
        }:undefined} className={`${!show? 'hidden opacity-0':' opacity-100'} fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center [transition-property:all] duration-1000 ease`}>
            <div
                onClick={(e)=>e.stopPropagation()}
                style={{animationDuration:'0.5s'}}
                className={`relative shadow-lg min-w-[300px] rounded-2xl p-5 ${animType + "-anim"} popup-modal bg-tertiary ${show? '':'closed'} ${className}`}>
                    <div onClick={(e)=>{
                        if(onClose){
                            e.stopPropagation();
                            onClose();
                        }
                    }} className={`rounded-circle z-[51] absolute -right-3.5 -top-3.5 cursor-pointer text-[12px] p-3 flex items-center justify-center text-white ${negative? 'bg-red-600': 'bg-purple'}`}>
                        <FaPlus className="rotate-45" />
                    </div>
                    {children}
            </div>
            
        </div>
    )

}