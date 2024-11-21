import React from 'react'
import CegLogo from '/src/assets/images/ceg_logo.png'
import qmulLogo from '/src/assets/images/QMUL_Logo_Blue_RGB.png'
import Menu from '/src/components/sections/Menu.jsx'


const Header = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-between ">
         
         <div className="flex justify-between w-full ">
            <div className="text-left">
               <a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">
                  <img src={CegLogo} alt="Company Logo" className="w-20 h-auto" />
               </a>
            </div>
         
            <div className="text-center w-full sm:w-auto">
               <strong className="text-lg sm:text-xl md:text-2xl lg:text-3xl">CEG AF TOOL</strong>
               
               <div className=" mt-4">
                  <Menu />
               </div>
            </div>
         
            <div className="text-right">
               <a href="https://www.qmul.ac.uk" target="_blank" rel="noopener noreferrer">
               <img src={qmulLogo} alt="Clinical effectiveness group logo" className="w-40"/>
             </a>
            </div>
         </div>
         
         
        
      </header>
      
    </>
  )
}

export default Header
