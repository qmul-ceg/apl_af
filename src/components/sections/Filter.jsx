import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const Filter = () => {

   const[filterMenu, setFilterMenu] = useState(true)
   const[quickFilter, setQuickFilter] = useState(true)

   const toggleFilter =() =>{
      setFilterMenu(!filterMenu)
   }

   const toggleQuickFilter =()=>{
      setQuickFilter(!quickFilter)
   }


   return (
      <>
         <div className= "flex justify-between items-center  w-full h-14 px-4 rounded-t-lg bg-[#648DBC] text-white">
            <strong>FILTERS</strong>

            <button onClick={toggleFilter}>
               {filterMenu ? <FiChevronDown /> : <FiChevronUp/>}
            </button>
         </div>
         
         
         
         {
            filterMenu &&(
               <div className= "flex justify-between border border-gray-400 w-full px-4 py-2 h-80" id="collapsible_filter ">
                  
                  <div className="w-[70vh] flex justify-between ">
                     <div className= "w-64 flex flex-col gap-6 ">
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 >Anticoagulants / Antiplatelets</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="none">NONE</SelectItem>
                                 <SelectItem value="doac_warfarin">DOAC or WARFARIN</SelectItem>
                                 <SelectItem value="doac">DOAC</SelectItem>
                                 <SelectItem value="warfarin">WARFARIN</SelectItem>
                                 <SelectItem value="antiplatelets">ANTIPLATELETS ONLY</SelectItem>
                                 <SelectItem value="dual_therapy">DUAL THERAPY</SelectItem>
                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>CHA₂DS₂-VASc</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">≥ 2</SelectItem>
                                 <SelectItem value="dark">1</SelectItem>
                                 <SelectItem value="system">0</SelectItem>
                                 <SelectItem value="system">Recorded {'>'} 12m</SelectItem>
                                 <SelectItem value="system">Not Recorded</SelectItem>

                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>VULNERABILITIES</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">SMI</SelectItem>
                                 <SelectItem value="dark">Learning Disability</SelectItem>
                                 <SelectItem value="system">Dementia</SelectItem>
                                 <SelectItem value="system">Housebound</SelectItem> 
                              </SelectContent>
                        </Select>

                     </div>

                     <div className= "w-40 flex flex-col gap-6">
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>AGE</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="none">{'<'} 65</SelectItem>
                                 <SelectItem value="doac_warfarin">65 - 79</SelectItem>
                                 <SelectItem value="doac">80+</SelectItem>
                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>MED REVIEW</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">Yes</SelectItem>
                                 <SelectItem value="dark">No</SelectItem>
                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>ORBIT</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">≥ 4</SelectItem>
                                 <SelectItem value="dark">Recorded {'>'} 12m</SelectItem>
                                 <SelectItem value="system">Not Recorded</SelectItem>
                              </SelectContent>
                        </Select>

                     </div>
                     
                     <div className= "w-40 flex flex-col gap-6 ">
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>NSAID</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">Yes</SelectItem>
                                 <SelectItem value="dark">No</SelectItem>
                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>CVD</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light">Yes</SelectItem>
                                 <SelectItem value="dark">No</SelectItem>
                              </SelectContent>
                        </Select>

                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>BP</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="light"> {'<'} 130/80</SelectItem>
                                 <SelectItem value="dark"> {'<'} 140/90</SelectItem>
                                 <SelectItem value="system">140/90 - 159/90</SelectItem>
                                 <SelectItem value="system"> ≥ 160/100</SelectItem>

                              </SelectContent>
                        </Select>

                     </div>
                  </div>
                  
                  {/* QUICK FILTERS */}
                  <div className =" flex flex-col justify-between w-[20vw]">
                     <div className =" flex flex-col">
                        <header className="flex justify-between px-2 py-2 rounded-t-lg  bg-black text-white" >
                           <strong>QUICK FILTERS</strong>
                           <button onClick={toggleQuickFilter}>
                              { quickFilter  ? <FiChevronDown /> : <FiChevronUp/> }
                           </button>
                        </header>
                     
                        {
                           quickFilter && (
                              <div className="border  border-gray-400 border-t-0">
                                 <ul>
                                    <li>???</li>
                                    <li>???</li>
                                    <li>??</li>
                                 </ul>
                              </div>
                           )
                        }
                     </div>
                     
                     <div>
                        <Button className = "bg-[#648DBC] font-bold text-white"variant="outline">RESET FILTERS</Button>
                     </div>
                     

                  </div>


                  {/* SUMMARY */}
                  <div className="flex flex-col  w-[30vw] ">
                     
                     <header className=" flex px-2 py-2 rounded-t-lg bg-[#648DBC] text-white">
                        <strong>SUMMARY</strong>
                     </header>

                     <div className="border border-t-0 border-gray-400 flex flex-col">
                        <div className=" p-2 text-xs w-full h-full flex flex-col gap-1" >
                           <div className="border-b border-gray flex justify-between">
                              <strong>Atrial Fibrullation Register</strong>
                              <div className="w-20 flex justify-between">
                                 <strong>0</strong>
                                 <strong>0%</strong>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>*Modified AF008: CHA₂DS₂-VASc ≥ 2 issued Anticoagulants (6m)</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>CHA₂DS₂-VASc ≥ 2 and NOT issued Anticoagulants (6m)</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>  CHA₂DS₂-VASc ≥ 2 issued Aspirin/Antiplatelets ONLY (6m)</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>CHA₂DS₂-VASc ≥ 2 issued BOTH Anticoagulants + Antiplatelets (6m)</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>CHA₂DS₂-VASc ≥ 2 issued DOAC(6m)</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>
                           <div className="border-b border-gray flex justify-between">
                              <span>*Modified AF006: new CHA₂DS₂-VASc ≥ 2 in last 12m</span>
                              <div className=" w-20 flex justify-between">
                                 <span>0</span>
                                 <span>0%</span>
                              </div>
                           </div>

                        </div>
                        <div className="text-xs mt-4">
                           *Modified QoF no exclusions for contraindication or declined
                        </div>
                        {/* EXTERNAL LINKS */}
                        
                     </div>
                     
                     <div className=" mt-6">
                        <Popover >
                           <PopoverTrigger className="flex justify-center py-2 px-6  ml-auto">
                              <FiInfo className="text-xl" /> {/* Icon component */}
                           </PopoverTrigger>
                           <PopoverContent>
                              <div>
                                 <strong className="text-sm">EXTERNAL LINKS</strong>
                                 <ul className=" ml-4 text-sm">
                                    <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">https://www.qmul.ac.uk/ceg/</a></li>

                                 </ul>
                              </div>
                           </PopoverContent>
                        </Popover>
                     </div>
                     
                     
         
                  </div>
               </div>
            )
         }
      </>
  )
}

export default Filter
