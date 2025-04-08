import { Icon } from 'iconsax-react'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons'

interface popupMenu{
  icon?:ReactNode,
  item: string,
  onClick?: ()=> void,
  negative?:boolean

}


interface props{
    className?: string | undefined,
    id?:string,
    targetId:string,
    show?:boolean,
    onClose:()=>void,
    position?:'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
    offset?: number,
    children?: ReactNode,
    menus?:popupMenu[]
}
export default function PopupMenu({className, show=false, targetId, onClose, offset=20, position='top-right', id, menus, children}:props) {
  const positionAnchor = `--${targetId}`;

  return (
    <div onClick={(e)=>e.stopPropagation()} id={id} style={{
      ["--popup-offset-margin"]:`${offset}px`,
      ["positionAnchor"]: positionAnchor,
    } as React.CSSProperties & Record<string, string>}
    className={`rounded-3xl popover-${position} ${show?'show':''} popover flex flex-col gap-3.5 ${className}`}>
      {menus && menus.map((menu, index) =>(
        <div key={index+1} onClick={(e)=>{
          onClose();
          if(menu.onClick){
            menu.onClick();
          }
        }} className={`flex items-center justify-start pl-3 border-b pb-3.5 last:pb-0 border-b-secondary border-opacity-10 last:border-b-0 cursor-pointer ${menu.negative? 'text-red-600':'text-secondary'}`}>
          {menu.icon && <div className='mr-3'>{menu.icon}</div>}
          <div className="min-w-[130px]">
            {menu.item}
          </div>
          
        </div>
      ))}
      {!menus && children}
    </div>
  )
}
