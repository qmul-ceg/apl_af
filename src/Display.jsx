import React, { useState, useContext, useEffect } from 'react'


import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { MainContext } from './MainContext'


import {  } from 'react'
// import { useNavigate } from 'react-router-dom'
const Display = () => {
  

   const { isModalOpen, dataCount, relativeRunDate } = useContext(MainContext)

return (
   <div className="flex flex-col min-h-[100vh] items-center">
      {/* HEADER */}
      <section id="header" className =" flex justify-center mt-2">
            <div className="w-[98vw]">
               <Header />
            </div>
      </section>
       
      <Modal open ={isModalOpen}>
         
      </Modal>

      {/* FILTER DROPDOWN */}
      <section className="flex flex-col justify-center items-center  mt-4" >
         <div className=" w-[98vw]">
            <Filter /> 
         </div>
         
      </section>
      
      <div className=" mt-2 w-[98vw] mx-auto text-left pl-2 pr-2 flex justify-between">
         <p>Patient count: <strong className='text-[#E6007E]'>{dataCount}</strong></p>
         <p>Relative run date: <strong className='text-[#E6007E]'>{relativeRunDate}</strong></p>

      </div>
      
      {/* DISPLAY DATA */}
      <section className= "flex justify-center  mt-2 mb-2" id="display_data">
         <div className=" w-[98vw] ">
            <Data />
         </div>
         
      </section>
      <footer className="text-center lg:text-xs xl:text-sm 2xl:text-sm  bottom-0 mt-auto flex gap-2 mb-2">
         <p className="font-semibold"> © Clinical Effectiveness Group (CEG), Queen Mary University of London. All rights reserved.</p> 
         <p className="font-semibold"> Attribution-NonCommercial-ShareAlike CC BY-NC-SA.</p>
      </footer>
      
     
     

   </div>
  )
}

export default Display
