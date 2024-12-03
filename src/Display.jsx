import React, { useState, useContext, useEffect } from 'react'


import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { MainContext } from './MainContext'


import {  } from 'react'
import { useNavigate } from 'react-router-dom'
const Display = () => {
  

   const { isModalOpen, dataCount } = useContext(MainContext)

return (
   <div className="">
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
      
      <div className=" mt-2 w-[98vw] mx-auto text-left pl-2 ">
         <strong>Patient count: <span className='text-red-600'>{dataCount}</span></strong> 
      </div>
      {/* DISPLAY DATA */}
      <section className= "flex justify-center  mt-2" id="display_data">
         <div className=" w-[98vw] ">
            <Data />
         </div>
         
      </section>

     

   </div>
  )
}

export default Display
