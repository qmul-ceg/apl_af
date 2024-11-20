import React, { useState } from 'react'

const Modal = ({isOpen, onClose, content}) => {
   if(!isOpen) return null;

  return (
    <div>
         <div className="flex flex-col justify-between w-[30vw]">  
            <header className=" flex px-2 py-2 rounded-t-lg bg-[#648DBC] text-white justify-between">
               <strong>PATIENT INFORMATION</strong>
               <button onClick={onClose} > <strong></strong>x </button>
            </header>
            <div>
               {/* content */}
            </div>
         </div>
    </div>
  )
}

export default Modal
