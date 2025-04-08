import React from 'react'

export interface colorAndName{fullName: string, color:string};

interface props{
    images:(string | colorAndName)[],
    size?:number,
    textSize?: number,
    ratio?:number,
    outlineColor?: string,
    showTruncatedCount?:boolean,
    limit?:number,
    outline?:number,
}

export default function OverlappingImages({images, size=20, showTruncatedCount=true, textSize, outlineColor = 'var(--overlapping-outline-color)', outline=2, limit=5, ratio=0.35}:props) {
    const limitedImages = [...images].splice(0, limit)
  return (
    <div style={{width: `${(size  + ((limitedImages.length-1) * (size* (1-ratio))))+outline}px`, height: `${size+outline}px`}} className='flex relative justify-start items-center'>
        {limitedImages.reverse().map((image,index, arr) => {
          const isCapped = arr.length<images.length && index===arr.length-1 && showTruncatedCount;
          return <div  key={index} style={{outlineColor, outlineWidth:outline, left:`${index === 0? 0: (index)*(size+outline)*(1-ratio)}px`, width:`${size}px`, zIndex:arr.length-index-1, height:`${size}px`}} className='absolute rounded-circle outline overflow-hidden'>
            {typeof image === 'string' && !isCapped && <img className='w-full h-full object-cover' src={image} />}
            {typeof image === 'object' && !isCapped && <div style={{fontSize: (size*0.5), backgroundColor:image.color ?? 'green'}} className='w-full h-full flex flex-center text-center text-white open-sans font-medium'>
                <p style={{fontSize: textSize}}>{image.fullName.split(' ').map(name=> name.charAt(0).toUpperCase()).splice(0, Math.min(2, image.fullName.split(' ').length))}</p>
              </div>}
            {isCapped && <div style={{fontSize: (size*0.5)}} className='w-full h-full flex flex-center text-center text-white open-sans font-medium bg-black'>
                <p style={{fontSize: textSize}}>+{images.length-limit}</p>
              </div>}
          </div>
        })}
    </div>
  )
}
