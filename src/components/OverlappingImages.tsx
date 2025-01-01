import React from 'react'

export interface colorAndName{fullName: string, color:string};

interface props{
    images:(string | colorAndName)[],
    size?:number,
    ratio?:number,
    outlineColor?: string,
    limit?:number,
    outline?:number,
}

export default function OverlappingImages({images, size=20, outlineColor = 'var(--overlapping-outline-color)', outline=2, limit=5, ratio=0.35}:props) {
    const limitedImages = [...images].splice(-limit)
  return (
    <div style={{width: `${(size  + ((limitedImages.length-1) * (size* (1-ratio))))+outline}px`, height: `${size+outline}px`}} className='flex relative justify-start items-center'>
        {limitedImages.reverse().map((image,index, arr) => (
          <div  key={index} style={{outlineColor,left:`${index === 0? 0: (index)*(size+outline)*(1-ratio)}px`, width:`${size}px`, zIndex:arr.length-index-1, height:`${size}px`}} className='absolute rounded-circle outline outline-[2px] overflow-hidden'>
            {typeof image === 'string' && <img className='w-full h-full object-cover' src={image} />}
            {typeof image === 'object' && <div style={{fontSize: (size*0.5), backgroundColor:image.color ?? 'green'}} className='w-full h-full flex flex-center text-center text-white open-sans font-medium'>
                <p>{image.fullName.split(' ').map(name=> name.charAt(0).toUpperCase()).splice(0, Math.min(2, image.fullName.split(' ').length))}</p>
              </div>}
          </div>
            ))}
    </div>
  )
}
