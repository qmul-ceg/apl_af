import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Link } from 'react-router-dom'
import { MainContext } from '@/MainContext'
import { exportAccuRxList, exportNHS_list } from '@/helper/ExportData';
import { GpSystems } from '@/enums/GPsystems';



const Menu = () => {


   const { getFilteredPatients, resetFilters } = useContext(MainContext);
   const filteredPatients = getFilteredPatients();

   const handleExportNHS = () => {
      exportNHS_list(filteredPatients);
      this.preventDefault();
   }      

   const handleExporAccuRxList = () => {
      exportAccuRxList(filteredPatients, GpSystems.EMIS_Web);
      this.preventDefault();
   }    

   return (
      <>
         <div className="flex border border-gray rounded-lg">
         <div className="ml-2">
               <Link to="/">
                  <button className=" py-2 px-6 " onClick={resetFilters}>
                     <strong className="text-gray-800 hover:text-black ">Import</strong>
                  </button>
               </Link>
               
            </div>
            <div className=" mr-2">
               <Popover>
                  <PopoverTrigger className ="flex justify-center py-2 px-6 ">
                     <div>
                        <strong className="text-gray-800 hover:text-black">Export</strong>
                     </div>
                  </PopoverTrigger>
                  <PopoverContent>
                     <div className="">
                        <strong className="text-sm">EXPORT SELECTED PATIENTS</strong>
                        <ul className=" ml-4 text-sm">
                           <li>EXCEL LIST</li>
                           <li><a href='#' onClick={handleExporAccuRxList}>ACCURX LIST</a></li>
                           <li><a href='#' onClick={handleExportNHS}>NHS NO. LIST</a></li>
                        </ul>
                     </div>
                     <div>
                        <strong className="text-sm">EXPORT ALL PATIENTS WITH NOTE</strong>
                        <ul className=" ml-4 text-sm">
                           <li>EXCEL LIST</li>
                        </ul>
                     </div>
                     

                  </PopoverContent>
               </Popover>
            </div>
            
           

           
         </div>  
    </>
  )
}

export default Menu
