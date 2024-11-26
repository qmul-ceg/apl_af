import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { MainContext } from '@/MainContext'
import { useContext } from 'react'

const Filter = () => {

   const{  
         selectedAges, handleAgeSelection, 
         nsaid, handleNSAID, 
         cvd, handleCVD,
         selectedBP, handleBP,
         selectedChd, handleChd,
         selectedOrbit, handleOrbit,
         medReview, handleMedReview,
         selectedAnti, handleAntiFilter} = useContext(MainContext);



   //FILTER FUNCTIONALITY
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
                     {/* FILTER COLUMN 1 */}
                     <div className= "w-64 flex flex-col gap-6 ">
                        {/* ANTICOAGULANT FILTER */}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 >Anticoagulants / Antiplatelets</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="none"
                                       name="antiFilter"
                                       checked={selectedAnti === "none"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>NONE</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="doac_warf"
                                       name="antiFilter"
                                       checked={selectedAnti === "doac_warf"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>DOAC or WARFARIN</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="doac"
                                       name="antiFilter"
                                       checked={selectedAnti === "doac"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>DOAC</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="warf"
                                       name="antiFilter"
                                       checked={selectedAnti === "warf"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>WARFARIN</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="antiplatelets"
                                       name="antiFilter"
                                       checked={selectedAnti === "antiplatelets"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>ANTIPLATELETS ONLY</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="radio"
                                       value="dual"
                                       name="antiFilter"
                                       checked={selectedAnti === "dual"}
                                       onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>DUAL THERAPY</span>
                                 </label>
                              </SelectContent>
                        </Select>

                        {/* CHA₂DS₂-VASc FILTER */}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>CHA₂DS₂-VASc</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="gte2"
                                       checked={selectedChd.includes("gte2")}
                                       onChange={() => handleChd("gte2")}
                                    />
                                    <span>≥ 2</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="1"
                                       checked={selectedChd.includes("1")}
                                       onChange={() => handleChd("1")}
                                    />
                                    <span>1</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="0"
                                       checked={selectedChd.includes("0")}
                                       onChange={() => handleChd("0")}
                                    />
                                    <span>0</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value=">12m"
                                       checked={selectedChd.includes(">12m")}
                                       onChange={() => handleChd(">12m")}
                                    />
                                    <span>Recorded {'>'} 12m</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="not_recorded"
                                       checked={selectedChd.includes("not_recorded")}
                                       onChange={() => handleChd("not_recorded")}
                                    />
                                    <span>Not Recorded</span>
                                 </label>
                              </SelectContent>
                        </Select>

                        {/*VULNERABILITIES FILTER */}
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

                     {/* FILTER COLUMN 2 */}
                     <div className= "w-44 flex flex-col gap-6">
                        {/* AGE FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1>AGE</h1>
                           </SelectTrigger>
                           <SelectContent>
                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value="<65"
                                    checked={selectedAges.includes("<65")}
                                    onChange={() => handleAgeSelection("<65")}
                                 />
                                 <span>{"< 65"}</span>
                              </label>

                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value="65-79"
                                    checked={selectedAges.includes("65-79")}
                                    onChange={() => handleAgeSelection("65-79")}
                                 />
                                 <span>65 - 79</span>
                              </label>
                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value="80+"
                                    checked={selectedAges.includes("80+")}
                                    onChange={() => handleAgeSelection("80+")}
                                 />
                                 <span>80+</span>
                              </label>
                           </SelectContent>
                        </Select>

                        {/* MED REVIEW FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>MED REVIEW {">"} 12m</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                              <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       name="medReview"
                                       value="YES"
                                       checked = {medReview=== "YES"}
                                       onChange= {()=>handleMedReview("YES")}
                                    />
                                    <span>{"YES"}</span>
                                 </label>

                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                          type="checkbox"
                                          name="medReview"
                                          value="NO"
                                          checked={medReview === "NO"}
                                          onChange={()=>handleMedReview("NO")}
                                       />
                                       <span>{"NO"}</span>
                                 </label>
                              </SelectContent>
                        </Select>

                         {/* ORBIT FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1>ORBIT</h1>
                              {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value="gte4"
                                    checked={selectedOrbit.includes("gte4")}
                                    onChange={() => handleOrbit("gte4")}
                                 />
                                 <span>≥ 4</span>
                              </label>
                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value=">12m"
                                    checked={selectedOrbit.includes(">12m")}
                                    onChange={() => handleOrbit(">12m")}
                                 />
                                 <span>Recorded {'>'} 12m</span>
                              </label>
                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    value="not_recorded"
                                    checked={selectedOrbit.includes("not_recorded")}
                                    onChange={() => handleOrbit("not_recorded")}
                                 />
                                 <span>Not Recorded</span>
                              </label>
                              
                              
                           </SelectContent>
                        </Select>
                     </div>
                     
                     {/* FILTER COLUMN 3 */}
                     <div className= "w-40 flex flex-col gap-6 ">
                        {/*NSAID FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>NSAID</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       name="nsaid"
                                       value="YES"
                                       checked= {nsaid=== "YES"}
                                       onChange= {()=>handleNSAID("YES")}
                                    />
                                    <span>{"YES"}</span>
                                 </label>

                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                          type="checkbox"
                                          name="nsaid"
                                          value="NO"
                                          checked={nsaid === "NO"}
                                          onChange={()=>handleNSAID("NO")}
                                       />
                                       <span>{"NO"}</span>
                                 </label>
                              </SelectContent>
                        </Select>

                        {/*CVD FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1>CVD</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 ml-4">
                                       <input
                                          type="checkbox"
                                          name="cvd"
                                          value="YES"
                                          checked= {cvd=== "YES"}
                                          onChange= {()=>handleCVD("YES")}
                                       />
                                       <span>{"YES"}</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                          type="checkbox"
                                          name="cvd"
                                          value="NO"
                                          checked={cvd === "NO"}
                                          onChange={()=>handleCVD("NO")}
                                       />
                                       <span>{"NO"}</span>
                                 </label>
                              </SelectContent>
                        </Select>

                        {/* BP FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1>BP</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                              <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="lt130-80"
                                       checked={selectedBP.includes("lt130-80")}
                                       onChange={() => handleBP("lt130-80")}
                                    />
                                    <span>{"<"} 130/80</span>
                                 </label>

                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="lt140-90"
                                       checked={selectedBP.includes("lt140-90")}
                                       onChange={() => handleBP("lt140-90")}
                                    />
                                    <span>{"<"} 140/90</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="140/90-159/90"
                                       checked={selectedBP.includes("140/90-159/90")}
                                       onChange={() => handleBP("140/90-159/90")}
                                    />
                                    <span>140/90 - 159/90</span>
                                 </label>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value="gte160-100"
                                       checked={selectedBP.includes("gte160-100")}
                                       onChange={() => handleBP("gte160-100")}
                                    />
                                    <span> ≥ 160/100</span>
                                 </label>
                                 {/* <SelectItem value="light"> {'<'} 130/80</SelectItem>
                                 <SelectItem value="dark"> {'<'} 140/90</SelectItem>
                                 <SelectItem value="system">140/90 - 159/90</SelectItem>
                                 <SelectItem value="system"> ≥ 160/100</SelectItem> */}

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
