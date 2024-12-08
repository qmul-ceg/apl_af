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
         selectedAges, handleAgeSelection, 
         nsaid, handleNSAID, 
         cvd, handleCVD,
         selectedBP, handleBP,
         selectedChd, handleChd,
         selectedOrbit, handleOrbit,
         medReview, handleMedReview, setMedReview,
         setSelectedAnti,
         selectedAnti, handleAntiFilter,
         selectedVulnerabilities, handleVulnerabilities,
         importedData, relativeRunDate,
         resetFilters, data} = useContext(MainContext);



   //FILTER AND QUICK FILTERS FUNCTIONALITY
   const[filterMenu, setFilterMenu] = useState(true)
   const[quickFilter, setQuickFilter] = useState(true)

   //FILTER DISPLAY FEATURE
   // const [displayAntiFilter] = useState(selectedAnti)

   const [selectedAntiLabel, setSelectedAntiLabel] = useState()
  
   



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

   const removeAntiFilter = ()=>{
      handleAntiFilter("none")
   }

   const removeMedReviewFilter = () => {
      handleMedReview("")
   }

   const removeNsaidFilter =()=>{
      handleNSAID("")
   }

   const removeCvdFilter =()=>{
      handleCVD("")
   }
   //Display the value of selected anti

      

   React.useEffect(() =>{
      console.log("displayCVD: ", displayCvd)
   }, [cvd])



   const handleAntiChange = (event, label)=>{
      handleAntiFilter(event.target.value)
      setSelectedAntiLabel(label)
   }







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
         <div className= "flex justify-between items-center  w-full h-16 px-4 rounded-t-lg bg-[#648DBC] text-white">
            <div className="flex items-center ">
               <strong className=" text-center">FILTERS</strong>
               <div className="px-2 ml-6  h-16 items-center">
                  {(data.length > 0 && displayAntiFilter[0].value !== "none") && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md">
                        {displayAntiFilter[0].name} - {displayAntiFilter[0].label } {<button className=" ml-2 "onClick={removeAntiFilter}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && displayMedReview[0].value !== "") && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                        {displayMedReview[0].name} - {displayMedReview[0].value } 
                        {<button className=" ml-2 "onClick={removeMedReviewFilter}>x</button>}
                     </button>
                  )}
                  {(data.length > 0 && displayNsaid[0].value !== "") && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                        {displayNsaid[0].name} - {displayNsaid[0].value } 
                        {<button className="ml-2"onClick={removeNsaidFilter}>x</button>}
                     </button>
                  )}
                  {/* {(data.length > 0 && displayCvd[0].value !== "none")  && (
                     <button className="border text-xs bg-white text-[#648DBC] px-2 rounded-md flex items-center text-center">
                        {displayCvd[0].name} - {displayCvd[0].value } 
                        {<button className="ml-2"onClick={removeCvdFilter}>x</button>}
                     </button>
                  )} */}
               </div>
            </div>
            
            
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
                        <Select className="">
                           <SelectTrigger className=" bg-[#648DBC] text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">ANTICOAGULANTS / ANTIPLATELETS</h1>
                              {/* <SelectValue placeholder="" /> */}
                           </SelectTrigger>
                           <SelectContent>
                              {[
                                 {value: "none", label:"NONE", name: 'Anti'},
                                 {value: "doac_warf", label: "DOAC or WARFARIN", name: 'Anti'},
                                 {value: "doac", label: "DOAC", name: 'Anti'},
                                 {value: "warf", label: "WARFARIN", name: 'Anti'},
                                 {value: "antiplatelets", label: "ANTIPLATELETS ONLY" , name: 'Anti'},
                                 {value: "no_anticoagulant", label: "NO ANTICOAGULANT" , name: 'Anti'},
                                 {value: "dual", label: "DUAL THERAPY" , name: 'Anti'},
                              ].map((item) => (
                                 <label 
                                    key ={item.value}
                                    className="flex items-center space-x-2 ml-4"
                                 >
                                    <input
                                    type="radio"
                                    value={item.value}
                                    name="antiFilter"
                                    checked={selectedAnti === item.value}
                                    onChange={(event) => handleAntiChange(event, item.label, item.name)}
                                    // onChange={(event) => handleAntiFilter(event.target.value)}
                                    />
                                    <span>{item.label}</span>
                                 </label>
                              ))}
                           </SelectContent>
                        </Select>

                        {/* MED REVIEW FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">MED REVIEW {">"} 12m</h1>
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

                        {/*VULNERABILITIES FILTER */}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                           <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">VULNERABILITIES</h1>
                           {/* <SelectValue placeholder="VULNERABILITIES" /> */}
                           </SelectTrigger>
                           <SelectContent>

                              {[
                                    {value: 'smi', label: 'SMI' },
                                    {value: 'learning_disability', label: 'Learning Disability' },
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
                                             checked={selectedVulnerabilities.includes(item.value)}
                                             onChange={() => handleVulnerabilities(item.value)}
                                       />
                                          <span>{item.label}</span>       
                                       </label>
                                    ))}
                           
                           </SelectContent>
                        </Select>

                        {/* CHA₂DS₂-VASc FILTER */}
                     
                     </div>

                     {/* FILTER COLUMN 2 */}
                     <div className= "flex flex-col gap-6">
                     <Select>
                              <SelectTrigger className=" bg-[#648DBC] text-white">
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm pr-2">CHA₂DS₂-VASc</h1>
                                 {/* <SelectValue placeholder="CHA₂DS₂-VASc" /> */}
                              </SelectTrigger>
                              <SelectContent>
                                 {[
                                    {value: 'gte2', label: '≥ 2' },
                                    {value: '1', label: '1' },
                                    {value: '0', label: '0' },
                                    {value: '>12m', label: 'Recorded > 12m' },
                                    {value: 'not_recorded', label: 'Not Recorded' },
                                 ].map((item, index) =>
                                    (
                                       <label
                                          value={item.value}
                                          className="flex items-center space-x-2 ml-4" 
                                       >
                                          <input
                                             type="checkbox"
                                             value={item.value}
                                             checked={selectedChd.includes(item.value)}
                                             onChange={() => handleChd(item.value)}
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
                        
                        {/* AGE FILTER*/}
                        <Select>
                           <SelectTrigger className=" bg-[#648DBC]  text-white">
                              <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">AGE</h1>
                           </SelectTrigger>
                           <SelectContent >
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
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">CVD</h1>
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
                                 <h1 className="text-xs text-left xl:text-sm 2xl:text-sm">BP</h1>
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
                  <div className =" flex-1 w-full flex flex-col justify-between max-w-[300px]">
                     <div className =" flex flex-col">
                        <header className="flex justify-between px-2 py-2 rounded-t-lg  bg-black text-white" >
                           <strong className ="text-xs text-left xl:text-sm 2xl:text-sm pr-2">QUICK FILTERS</strong>
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
                           onClick={resetFilters}>RESET FILTERS</Button>
                     </div>
                  </div>


                  {/* SUMMARY */}
                  <div className=" w-full max-w-[560px] flex flex-col justify-between">
                     <div>
                        <header className=" flex  rounded-t-lg px-2 py-2 bg-[#648DBC] text-white">
                           <strong className ="text-xs text-left xl:text-sm 2xl:text-sm pr-2">SUMMARY</strong>
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
