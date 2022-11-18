import React, { MouseEvent } from 'react'

type Props = {
  children?: JSX.Element
  close: (event: MouseEvent<HTMLElement>) => void
}
const Modal = ({ children, close }: Props) => {
  return (
    <div className="modal--overlay" onClick={close}>
      <div className="modal--window" onClick={e => e.stopPropagation()}>
        <span className="modal--close" onClick={close}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal
