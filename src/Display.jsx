import React, { useState, useContext } from 'react'


import Data from './components/sections/Data'
import Header from './components/sections/Header'
import Filter from './components/sections/Filter'
import Modal from './components/sections/Modal'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { MainContext } from './MainContext'


import {  } from 'react'
const Display = () => {
   // const[filterMenu, setFilterMenu] = useState(true)
   // const[quickFilter, setQuickFilter] = useState(true)

   // const toggleFilter =() =>{
   //    setFilterMenu(!filterMenu)
   // }

   // const toggleQuickFilter =()=>{
   //    setQuickFilter(!quickFilter)
   // }

   // Selected Value
   // const[openModal, setOpenModal] = useState(false)

   // const triggerModal =() =>{
   //    setModalOpen(!isModalOpen)
   // }

  

   const { isModalOpen } = useContext(MainContext)

return (
   <div>
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
      
      {/* DISPLAY DATA */}
      <section className= "flex justify-center  mt-4" id="display_data">
         <div className=" w-[98vw]">
            <Data />
         </div>
         
      </section>

     

   </div>
  )
}

export default Display
