import React from 'react'
// import CegLogo from '/src/assets/images/ceg_logo.png'
import qmulLogo from '/src/assets/images/QMUL_Logo_Blue_RGB.png'
import Menu from '/src/components/sections/Menu.jsx'


const Header = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-between ">
         
         <div className="flex justify-between w-full ">
            <div className="text-left  w-[20%] md:w-[20%] lg:w-[16%] xl:w-[10%] 2xl:w-[13%] ">
               <a href="https://www.qmul.ac.uk" target="_blank" rel="noopener noreferrer">
                  <img src={qmulLogo} alt="Clinical effectiveness group logo" className=""/>
               </a>
            </div>
         
            <div className="text-center w-full sm:w-auto  flex-row flex-1">
               <h1 className="text-sm md:text-md 
                  lg:text-lg xl:text-xl 2xl:text-2xl 
                   font-sourceSans font-bold
                  text-[#21376A]" 
               >Clinical Effectiveness Group</h1>
               <h1 className="text-xl md:text-2xl 
                  lg:text-3xl xl:text-4xl 
                  2xl:text-4xl  font-sourceSans 
                  font-bold
                  text-[#21376A]"
               >Atrial Fibrillation tool </h1>
 
            </div>
         
            <div className="text-right ">
                <div className=" mt-2 ">
                  <Menu />
               </div>
            </div>
         </div>
         
         
        
      </header>
      
    </>
  )
}

export default Header
