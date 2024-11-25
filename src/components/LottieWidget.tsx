import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

interface props{
    lottieAnimation:any,
    width:number,
    height:number,
    className?: string | undefined
    loop?:boolean,
  }



export default function LottieWidget({lottieAnimation, width, height, className='', loop=false}:props) {
    
  return (
    <Lottie className={className} animationData={lottieAnimation} color='#2196f3' loop={loop} width={width} height={height}  />
  )
}
