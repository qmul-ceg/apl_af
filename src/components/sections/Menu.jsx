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
         <div className="flex border border-[#21376A] rounded-lg">
           
            <div className="mr-1">
               <Popover>
                  <PopoverTrigger className ="h-full ">
                     <div className="text-center  px-6 ">
                        <p className="text-md hover:text-black font-bold text-[#21376A]">Export</p>
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

            {/* <div className='border border-[#21376A]'>

            </div> */}


            <div className="ml-1 w-[70%]">
               <Link to="/">
                  <button className="  flex flex-col  items-center px-4  py-1 hover:text-black group"  onClick={resetFilters} >
                     <p className="text-xs text-[#21376A]  group-hover:text-black font-bold">Load new</p>
                     <p className="text-xs text-[#21376A]  group-hover:text-black font-bold">patient data</p>

                  </button>
               </Link>
               
            </div>
            
           

           
         </div>  
    </>
  )
}

export default Menu
