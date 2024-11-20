import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Link } from 'react-router-dom'



const Menu = () => {
   return (
      <>
         <div className="flex border border-gray rounded-lg">
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
                           <li>ACCURX LIST</li>
                           <li>NHS NO. LIST</li>
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
            
           

            <div className="ml-2">
               <Link to="/">
                  <button className=" py-2 px-6">
                     <strong className="text-gray-800 hover:text-black">Import</strong>
                  </button>
               </Link>
               
            </div>
         </div>  
    </>
  )
}

export default Menu
