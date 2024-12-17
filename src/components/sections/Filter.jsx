import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { MainContext } from '@/MainContext'
import { useContext } from 'react'
import { AFibColumns } from '@/enums/AFibColumns'

const Filter = () => {

   const{  
         selectedAges, handleAgeSelection, removeAgeDisplay,
         nsaid, handleNSAID, 
         cvd, handleCVD, removeCvdDisplay,
         selectedBP, handleBP, removeBP,
         selectedChdValue,handleChdValue,  removeChdValue,
         selectedChdDate,handleChdDate, removeChdDate,
         // selectedChd, handleChd,
         selectedOrbit, handleOrbit, removeOrbitDisplay,
         medReview, handleMedReview, setMedReview,
         handleVulnerabilitesFilter,
         selectedAnti, handleAntiFilter, setSelectedAnti, removeAntiFilter,
         selectedVulnerabilities, 
         setSelectedVulnerabilities, 
         importedData, relativeRunDate,
         resetFilters, data} = useContext(MainContext);



   //FILTER AND QUICK FILTERS FUNCTIONALITY
   const[filterMenu, setFilterMenu] = useState(true)
   const[quickFilter, setQuickFilter] = useState(true)

   //FILTER DISPLAY FEATURE
   // const [displayAntiFilter] = useState(selectedAnti)

   const [selectedAntiLabel, setSelectedAntiLabel] = useState()

   // console.log(selectedVulnerabilities)



   const displayAntiFilter =[
      {
         name: "Anti",
         value : selectedAnti,
         label: selectedAntiLabel
      }
   ]

   const displayMedReview =[
      {
         name: "Med Review",
         value: medReview,
      }
   ]

   const displayNsaid=[
      {
         name :"NSAID",
         value: nsaid
      }
   ]
   const displayCvd=[
      {
         name : "CVD",
         value: cvd
      }
   ]




   const removeNsaidFilter =()=>{
      handleNSAID("")
   }

   const removeCvdFilter =()=>{
      handleCVD("")
   }



   // const handleAntiChange = (event, label)=>{
   //    handleAntiFilter(event.target.value)
   // }

   


   const removeVulnerabilities = (value) =>{
      setSelectedVulnerabilities((prev) => 
         prev.filter((item) => item.value !== value)
     );

   };



   
   



   //FILTER MENU 
   const toggleFilter =() =>{
      setFilterMenu(!filterMenu)
   }

   const toggleQuickFilter =()=>{
      setQuickFilter(!quickFilter)
   }


   //SUMMARY TABLE FUNCTIONALITY
   const chadsvasce2 = (chadsvasc2Cnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2)           
         chadsvasc2Cnt += 1;
      return chadsvasc2Cnt;
   }

   const chadsvasce2Anticoag = (anticoagCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && patient[AFibColumns.OnAnticoagulant].includes('YES'))           
         anticoagCnt += 1;
      return anticoagCnt;
   }

   const chadsvasce2NotOnAnticoag = (notOnAnticoagCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && !patient[AFibColumns.OnAnticoagulant].includes('YES'))           
         notOnAnticoagCnt += 1;
      return notOnAnticoagCnt;
   }

   const chadsvasce2OnAspAntipOnly = (onAspAntipOnlyCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 &&           
          !patient[AFibColumns.OnAnticoagulant].includes('YES') &&
          patient[AFibColumns.OnAspirinAntiplatelet].includes('YES') )           
            onAspAntipOnlyCnt += 1;
      return onAspAntipOnlyCnt;
   }

   const chadsvasce2OnAnticoagAspAntip = (onAnticoagAspAntipCnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && 
          patient[AFibColumns.OnAnticoagulant].includes('YES') &&
          patient[AFibColumns.OnAspirinAntiplatelet].includes('YES'))                     
            onAnticoagAspAntipCnt += 1;
      return onAnticoagAspAntipCnt;
   }

   const chadsvasce2DOAC = (DOAC_Cnt, patient) => {
      if (parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2 && patient[AFibColumns.OnAnticoagulant].includes('DOAC'))           
         DOAC_Cnt += 1;
      return DOAC_Cnt;
   }

   const newChadsvasce2 = (newChadsvasc2Cnt, patient) => {

      if (patient[AFibColumns.CHADSVAScDate]) {

         const dtRelRunDate = new Date(relativeRunDate);
         dtRelRunDate.setMonth(dtRelRunDate.getMonth() - 12);
         //const dtRelRunDate = new Date("02/22/2024");
         //console.log(dtRelRunDate.toLocaleDateString());

         if ( Date.parse(patient[AFibColumns.CHADSVAScDate]) >= dtRelRunDate.getTime() )           
            newChadsvasc2Cnt += 1;
      }
      return newChadsvasc2Cnt;
   }

   const chadsvasc2RecordedPrior12m = (chadsvasc2Prior12mCnt, patient) => {

      if (patient[AFibColumns.CHADSVAScDate]) {

         const dtRelRunDate = new Date(relativeRunDate);
         dtRelRunDate.setMonth(dtRelRunDate.getMonth() - 12);
         //const dtRelRunDate = new Date("02/22/2024");   
         //console.log(dtRelRunDate.toLocaleDateString());
         
         if ( Date.parse(patient[AFibColumns.CHADSVAScDate]) <= dtRelRunDate.getTime() && parseInt(patient[AFibColumns.CHADSVAScValue]) >= 2)           
            chadsvasc2Prior12mCnt += 1;
      }
      return chadsvasc2Prior12mCnt;
   }

   function percentageFormatter(numerator, denominator) {
      
      if (denominator < numerator || denominator <= 0) {
         return '0%';
      }
      else {

         return new Intl.NumberFormat('default', {
         style: 'percent',
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
         }).format(numerator / denominator);
      }
   }


   // console.log(selectedFilters)
   return (
      <>
         <div className= "flex justify-between items-center  w-full h-20 px-4 rounded-t-lg bg-[#648DBC] text-white">
            <div className="flex items-center ">
               <strong className=" text-center text-2xl">Filters</strong>
               {/* DISPLAY FILTERS */}
               <div className=" ml-6 items-center flex gap-2 border border-dotted  flex-wrap max-h-20">
                  {(data.length > 0 && selectedAnti) && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md">
                        <strong className ="mr-2">AntiCoag/AntiP:</strong> {selectedAnti.label } 
                        {<button className=" ml-2 font-bold" onClick={()=>removeAntiFilter()}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && displayMedReview[0].value !== "") && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">Med Review:</strong> {displayMedReview[0].value } 
                        {<button className=" ml-2 font-bold"onClick={() => handleMedReview("")}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && displayNsaid[0].value !== "") && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">NSAID:</strong> {displayNsaid[0].value } 
                        {<button className="ml-2 font-bold"onClick={removeNsaidFilter}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && cvd)  && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                         <strong className ="mr-2">CVD:</strong> {cvd.value } 
                        {<button className="ml-2 font-bold"onClick={removeCvdDisplay}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && selectedVulnerabilities.length > 0) && (
                     selectedVulnerabilities.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Vulnerabilities: </strong> {item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeVulnerabilities(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  
                  {/* BP DISPLAY */}
                  {(data.length > 0 && selectedBP.length > 0) && (
                     selectedBP.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">BP:</strong> {item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeBP(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  {/* CHA₂DS₂-VASc DISPLAY */}
                  {(data.length > 0 && selectedChdValue.length > 0 && selectedChdDate === null) && (
                     selectedChdValue.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeChdValue(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  {(data.length > 0 && selectedChdValue.length === 0 && selectedChdDate) && (
                     // selectedChdDate.map((item, id) => 
                        <button key = {selectedChdDate.value} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong> {selectedChdDate.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeChdDate()}>x</button>}
                        </button>
                     
                  )}
                  {(data.length > 0 && selectedChdValue.length > 0 && selectedChdDate) && (
                      selectedChdValue.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">CHA₂DS₂-VASc: </strong>{item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeChdValue(item.value)}>x</button>}
                           <span className="ml-2">{selectedChdDate.label} </span>
                           {<button className="ml-2 font-bold" onClick={()=>removeChdDate()}>x</button>}
                        </button>
                  ))}

                  {/* ORBIT DISPLAY */}
                  {(data.length > 0 && selectedOrbit.length > 0) && (
                     selectedOrbit.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">ORBIT:</strong> {item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeOrbitDisplay(item.value)}>x</button>}
                        </button>
                     )
                  )}

                  {(data.length > 0 && selectedAges.length > 0) && (
                     selectedAges.map((item, id) => 
                        <button key = {id} className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                           <strong className ="mr-2">Age:</strong> {item.label} 
                           {<button className="ml-2 font-bold" onClick={()=>removeAgeDisplay(item.value)}>x</button>}
                        </button>
                     )
                  )}
                  
               </div>
            </div>
            
            {/* TOGGLE COLLAPSE BUTTON */}
            <button onClick={toggleFilter}>
               {filterMenu ? <FiChevronDown /> : <FiChevronUp/>}
            </button>
         </div>
         


         {
            filterMenu && (
               <div className= "flex justify-between border border-gray-400 px-2 py-2 h-80" id="collapsible_filter ">
                  
                  {/* w-[70vh] flex justify-between */}
                  {/* FILTERS */}
                  <div className="flex   gap-2 max-w-[560px]">

                     {/* FILTER COLUMN 1 */}
                     <div className= "flex flex-col gap-6">
                        
                        {/* ANTICOAGULANT FILTER */}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC] text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">Anticoagulants / Antiplatelets</h1>
                              {/* <SelectValue placeholder="" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              {[
                                 // {value: "none", label:"NONE", name: 'Anti'},
                                 {value: "doac_warf", label: "DOAC or Warfarin", name: 'Anti'},
                                 {value: "doac", label: "DOAC", name: 'Anti'},
                                 {value: "warf", label: "Warfarin", name: 'Anti'},
                                 {value: "antiplatelets", label: "Antiplatelets only" , name: 'Anti'},
                                 {value: "no_anticoagulant", label: "None" , name: 'Anti'},
                                 {value: "dual", label: "Dual therapy" , name: 'Anti'},
                              ].map((item) => (
                                 <label 
                                    key ={item.value}
                                    className="flex items-center space-x-2 ml-4"
                                 >
                                    <input
                                    type="checkbox"
                                    value={item.value}
                                    name="antiFilter"
                                    // selectedChdDate && selectedChdDate.value === item.value
                                    checked={selectedAnti && selectedAnti.value === item.value || false}
                                    onChange={() => handleAntiFilter(item.value, item.label)}
                                    
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))}
                           </SelectContent>
                        </Select>

                        {/* MED REVIEW FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">Med review {">"} 12m</h1>
                              {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                           </SelectTrigger>
                           <SelectContent>
                           <label className="flex items-center space-x-2 ml-4">
                                 <input
                                    type="checkbox"
                                    name="medReview"
                                    value="Yes"
                                    checked = {medReview=== "Yes"}
                                    onChange= {()=>handleMedReview("Yes")}
                                 />
                                 <span>Yes</span>
                              </label>

                              <label className="flex items-center space-x-2 ml-4">
                                 <input
                                       type="checkbox"
                                       name="medReview"
                                       value="No"
                                       checked={medReview === "No"}
                                       onChange={()=>handleMedReview("No")}
                                    />
                                    <span>No</span>
                              </label>
                           </SelectContent>
                        </Select>

                        {/*VULNERABILITIES FILTER */}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                           <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">Vulnerabilities</h1>
                           {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>

                              {[
                                    {value: 'smi', label: 'SMI' },
                                    {value: 'learning_disability', label: 'Learning disability' },
                                    {value: 'dementia', label: 'Dementia' },
                                    {value: 'housebound', label: 'Housebound' },
                                 ].map((item, index) =>
                                    (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 ml-4" 
                                       >
                                       <input
                                          type="checkbox"
                                          value={item.value}
                                          checked={selectedVulnerabilities.some(object =>object.value === item.value)}
                                          onChange = {() => handleVulnerabilitesFilter(item.value, item.label)}
                                          
                                       />
                                          <span>{item.label}</span>       
                                       </label>
                                    ))}
                           
                           </SelectContent>
                        </Select>

                        
                     
                     </div>

                     {/* FILTER COLUMN 2 */}
                     <div className= "flex flex-col gap-6">
                        
                        {/* CHA₂DS₂-VASc FILTER */}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">CHA₂DS₂-VASc</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                              {[
                                 { value: 'gte2', label: '≥ 2' },
                                 { value: '1', label: '1' },
                                 { value: '0', label: '0' }
                              ].map((item, index) => (
                                 <label key={index} className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       value={item.value}
                                       checked={selectedChdValue.some(object => object.value === item.value)}
                                       onChange={() => handleChdValue(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))}
                              
                              <div className="w-full border"></div>
                              
                              {[
                                 { value: '>12m', label: 'Recorded > 12m' },
                                 { value: 'not_recorded', label: 'Not Recorded' },
                                 { value: '<12m', label: 'Recorded < 12m' }
                              ].map((item, index) => (
                                 <label key={index + 3} className="flex items-center space-x-2 ml-4">
                                    <input
                                    type="checkbox"
                                    // name="chdGroup" // Ensures only one radio button can be selected at a time
                                    value={item.value}
                                    checked= {selectedChdDate && selectedChdDate.value === item.value || false}
                                    onChange={() => handleChdDate(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))}
                                
                              </SelectContent>
                        </Select>

                        {/* ORBIT FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">ORBIT</h1>
                              {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              {[
                                 {value: "gte4", label : "≥ 4"},
                                 {value: ">12m", label : "Recorded > 12m"},
                                 {value: "not_recorded", label : "Not recorded"}
                              ].map((item, index) =>{
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 ml-4">
                                    <input
                                    type="checkbox"
                                    value={item.value}
                                    checked={selectedOrbit.some(object =>object.value === item.value)}
                                    onChange={() => handleOrbit(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                                 )
                              })}
                              
                           </SelectContent>
                        </Select>      
                        
                        {/* AGE FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">Age</h1>
                           </SelectTrigger>
                           <SelectContent >
                           {[
                                 {value: "<65", label : "< 65"},
                                 {value: "65-79", label : "65 - 79"},
                                 {value: "80+", label : "80+"}
                              ].map((item, index) =>{
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 ml-4">
                                    <input
                                    type="checkbox"
                                    value={item.value}
                                    checked={selectedAges.some(object =>object.value === item.value)}
                                    onChange={() => handleAgeSelection(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                                 )
                              })}

                           </SelectContent>
                        </Select>

                     </div>
                     
                     {/* FILTER COLUMN 3 */}
                     <div className= "flex flex-col gap-6 ">
                        {/*NSAID FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">NSAID</h1>
                                 {/* <SelectValue placeholder="" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                       type="checkbox"
                                       name="nsaid"
                                       value="Yes"
                                       checked= {nsaid=== "Yes"}
                                       onChange= {()=>handleNSAID("Yes")}
                                    />
                                    <span>{"Yes"}</span>
                                 </label>

                                 <label className="flex items-center space-x-2 ml-4">
                                    <input
                                          type="checkbox"
                                          name="nsaid"
                                          value="No"
                                          checked={nsaid === "No"}
                                          onChange={()=>handleNSAID("No")}
                                       />
                                       <span>{"No"}</span>
                                 </label>
                              </SelectContent>
                        </Select>

                        {/*CVD FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC]  text-white">
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">CVD</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent> {[
                                 {value: "Yes", label : "Yes"},
                                 {value: "No", label : "No"},
                        
                                 ].map((item, index) =>{
                                 return (
                                    <label key={index + 3} className="flex items-center space-x-2 ml-4">
                                    <input
                                    type="checkbox"
                                    value={item.value}
                                    checked={cvd && cvd.value === item.value}
                                    onChange={() => handleCVD(item.value, item.label)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                                 )
                              })}
                           
                              </SelectContent>
                        </Select>

                        {/* BP FILTER*/}
                        <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">BP</h1>
                                 {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 {[
                                    { value: "lt130-80", label: "< 130/80"},
                                    { value: "lt140-90", label: "< 140/90"},
                                    { value: "140/90-159/90", label: "140/90 - 159/90"},
                                    { value: "gte160-100", label: "≥ 160/100"}
                                 ].map((item) => {
                                    return (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 ml-4" 
                                       >
                                       <input
                                          type="checkbox"
                                          value={item.value}
                                          checked={selectedBP.some(object =>object.value === item.value)}
                                          onChange = {() => handleBP(item.value, item.label)}
                                          
                                       />
                                          <span>{item.label}</span>       
                                       </label>

                                    )
                                 })}
                              

                              </SelectContent>
                        </Select>

                     </div>
                  </div>
                  
                  
                  {/* QUICK FILTERS */}
                  <div className =" flex-1 w-full flex flex-col justify-between max-w-[300px]">
                     <div className =" flex flex-col">
                        <header className="flex justify-between px-2 py-2 rounded-t-lg  bg-black text-white" >
                           <strong className ="text-xs text-left xl:text-sm 2xl:text-sm pr-2">Quick filters</strong>
                           <button onClick={toggleQuickFilter}>
                              { quickFilter  ? <FiChevronDown /> : <FiChevronUp/> }
                           </button>
                        </header>
                     
                        {
                           quickFilter && (
                              <div className="border  border-gray-200 h-28 border-t-0">
                                 <ul>
                                    <li>???</li>
                                    <li>???</li>
                                    
                                 </ul>
                              </div>
                           )
                        }
                     </div>
                     
                     <div>
                        <Button 
                           className = "bg-[#648DBC] font-bold text-white"
                           variant="outline"
                           onClick={resetFilters}>Reset filters</Button>
                     </div>
                  </div>


                  {/* SUMMARY */}
                  <div className=" w-full max-w-[560px] flex flex-col justify-between">
                     <div>
                        <header className=" flex  rounded-t-lg px-2 py-2 bg-[#648DBC] text-white">
                           <strong className ="text-xs text-left xl:text-sm 2xl:text-sm pr-2">Summary</strong>
                        </header>

                        <div className="border border-t-0 border-gray-200 flex flex-col pt-2 px-2" >
                           <table className=" text-xs ">
                              <tbody className=" ">
                                 <tr className="border-b border-gray-200">
                                    <td className=" font-bold">Atrial Fibrillation Register</td>
                                    <td className=" font-semibold text-right">{importedData.length}</td>
                                    <td className="  font-semibold text-right">{ percentageFormatter(importedData.length, importedData.length) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100">
                                    <td className="">*Modified AF008: CHA₂DS₂-VASc ≥ 2 issued Anticoagulants (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2Anticoag,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2Anticoag,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 and NOT issued Anticoagulants (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2NotOnAnticoag,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2NotOnAnticoag,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued Aspirin/Antiplatelets ONLY (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2OnAspAntipOnly,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2OnAspAntipOnly,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                    <tr className="border-b border-gray-200">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued BOTH Anticoagulants + Antiplatelets (6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2OnAnticoagAspAntip,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2OnAnticoagAspAntip,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200 bg-gray-100">
                                    <td className="">CHA₂DS₂-VASc ≥ 2 issued DOAC(6m)</td>
                                    <td className=" text-right">{ importedData.reduce(chadsvasce2DOAC,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(chadsvasce2DOAC,0), importedData.reduce(chadsvasce2,0)) }</td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                    <td className="">*Modified AF006: new CHA₂DS₂-VASc ≥ 2 in last 12m</td>
                                    <td className=" text-right">{ importedData.reduce(newChadsvasce2,0) }</td>
                                    <td className=" text-right">{ percentageFormatter(importedData.reduce(newChadsvasce2,0), (importedData.length - importedData.reduce(chadsvasc2RecordedPrior12m,0)) ) }</td>
                                 </tr>
                              </tbody>
                           </table>

                           <div className="text-xs mt-10 border-b border-gray mb-2">
                               *Modified QoF no exclusions for contraindication or declined
                            </div>
                        </div>

                     
                        
                        {/* EXTERNAL LINKS */}
                        
                     </div>
                     
                        <div>
                           <Popover >
                              <PopoverTrigger className="flex justify-center pr-4 ml-auto">

                                 <strong>i</strong>
                                 
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



 // setDisplayVulnerabilities((prev) => prev.filter((item) => item.value !== value));
      // selectedVulnerabilities.map((item) => {
      //    if(item === value){
      //       return selectedVulnerabilities.filter((currentItems) => currentItems !== value )
      //    }
      // })
      
      
      // setDisplayVulnerabilities((prev) => {

      //    const exists = prev.some((item)=> item.value === value)

      //    if(exists){
      //       return prev.filter((item) => item.value !== value)
      //    }else{
      //       return [...prev, {value, label}];
      //    }
      // });
      
      
      // handleVulnerabilities,

      // {[
      //    {value: "none", label:"NONE", name: 'Anti'},
      //    {value: "doac_warf", label: "DOAC or WARFARIN", name: 'Anti'},
      //    {value: "doac", label: "DOAC", name: 'Anti'},
      //    {value: "warf", label: "WARFARIN", name: 'Anti'},
      //    {value: "antiplatelets", label: "ANTIPLATELETS ONLY" , name: 'Anti'},
      //    {value: "no_anticoagulant", label: "NO ANTICOAGULANT" , name: 'Anti'},
      //    {value: "dual", label: "DUAL THERAPY" , name: 'Anti'},
      // ].map((item) => (
      //    <label 
      //       key ={item.value}
      //       className="flex items-center space-x-2 ml-4"
      //    >
      //       <input
      //       type="radio"
      //       value={item.value}
      //       name="antiFilter"
      //       checked={selectedAnti === item.value}
      //       onChange={(event) => handleAntiChange(event, item.label, item.name)}
            
      //       />
      //       <span>{item.label}</span>
      //    </label>
      // ))}