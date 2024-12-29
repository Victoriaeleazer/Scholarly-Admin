import React, { ReactNode } from 'react'

interface props{
    id:string,
    className?:string,
    children:ReactNode
}
export default function PopupTarget({id, className, children}:props) {
  const anchorName = `--${id}`;

  return (
    <div id={id} style={{
        ["anchorName"]: anchorName
    } as React.CSSProperties & Record<string, string>}
    className={className}>{children}</div>
  )
}
