import React from 'react'

interface props{
    images:(string | undefined)[],
    size?:number,
    ratio?:number,
    limit?:number,
    outline?:number,
}

export default function OverlappingImages({images, size=20, outline=2, limit=5, ratio=0.35}:props) {
    const limitedImages = [...images].splice(-limit)
  return (
    <div style={{width: `${(size  + ((limitedImages.length-1) * (size* (1-ratio))))+outline}px`, height: `${size+outline}px`}} className='flex relative justify-start items-center'>
        {limitedImages.reverse().map((image,index, arr) => (
            <img key={index} width={size} height={size} style={{left:`${index === 0? 0: (index)*(size+outline)*(1-ratio)}px`, width:`${size}px`, zIndex:arr.length-index-1, height:`${size}px`}} className='object-cover absolute rounded-circle outline-[var(--overlapping-outline-color)] outline outline-[2px]' src={image ?? '/images/no_profile.webp'}/>
            ))}
    </div>
  )
}
