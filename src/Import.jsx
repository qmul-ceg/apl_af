import React, { useContext, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from './components/ui/card'
import CegLogo from './assets/images/ceg_logo.png'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group.jsx'
import { Button, buttonVariants } from './components/ui/button.jsx'
import {Link, useNavigate} from'react-router-dom'
import Papa from 'papaparse'
import { GpSystems } from './enums/GPsystems.ts'
import { MainContext } from './MainContext'
import { GpInformationSystems } from './enums/GpInformationSystems'
import { AFibColumns } from './enums/AFibColumns'
import { getBloodPressure, hasCVD, hasHypertension, onAnticoagulantMeds, onAspirinAntiplateletMeds, onNSAIDMeds, onStatinsMeds } from './helper/AFibLTCmeds'

const Import = () => {
   

   const navigate = useNavigate()//Inititalised the navigate function
   const [gpSystemSelected, setGpSystemSelected] = useState(GpSystems.NoneSelected)
 
   //Imports from our main context
   const { setImportedData, setRelativeRunDate } = useContext(MainContext)

   //Sets GPsystem 
   const handleGpSystemSelect = (event) =>{
      setGpSystemSelected(event.target.value)
   }

   GpSystems.EMIS_Web
   
   // FILE INPUT FUNCTIONALITY
   const fileInputRef = useRef(null)

   const handleButtonClick = () =>{
      if(fileInputRef.current) {
         fileInputRef.current.click()
      }
   }

   const handleFileUpload = (event) =>{
      
      //Get File
      let files = event.target.files;
      if (files.length === 0) return

      const file = files[0]
      let skipRows = 0;
      let runDateTime;
      let relativeRunDate;
   
      
      //Check GP system 
      if(gpSystemSelected === GpInformationSystems.EMIS_Web){
         if(file){
            const reader = new FileReader()
            reader.readAsText(file)

            reader.onload = function() {
               let lines = reader.result.split('\n');
               
               for (let i = 0; i < lines.length; i++){
                  let line = lines[i].split(',');
                  if(line[0].includes("Last Run") || line[0].includes("Last run")){
                     runDateTime = line[3]
                  }
                  if(line[0].includes("Patient Details")){
                     skipRows++;
                     break;
                  }
                  skipRows++;
               }
               parseData(file, skipRows) //?? HOISTING Function
               relativeRunDate = runDateTime.split(' ')[0] // Splits the run date and time and saves the first value in the variable
               setRelativeRunDate(relativeRunDate)
              
             
             };
         }
      }
   }

   function parseData(file, skipLines) {
      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          skipFirstNLines: skipLines,
          complete: function (result) {
              const dataArray = [];
              result.data.forEach((data, index) => {
                  if (index >= skipLines) {
                      dataArray.push(Object.values(data));
                      dataArray[dataArray.length - 1][AFibColumns.OnAnticoagulant] = onAnticoagulantMeds(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.OnAspirinAntiplatelet] = onAspirinAntiplateletMeds(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.OnNSAID] = onNSAIDMeds(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.OnStatin] = onStatinsMeds(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.CVD] = hasCVD(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.Hypertension] = hasHypertension(dataArray[dataArray.length - 1]);
                      dataArray[dataArray.length - 1][AFibColumns.BP] = getBloodPressure(dataArray[dataArray.length - 1]);
                     
                  }
              });
              console.log("Processed Data:", dataArray);
              setImportedData(dataArray)
              navigate("/display");
              
              
         },
          error: function (error) {
              console.error("Error parsing the CSV file:", error);
              alert("Error parsing the CSV file.");
          }
      });

  }


  return (
   <>
      <div className = "flex justify-center  items-start h-screen ">
      {/* <div>
            <img />
            <h1>Atrial Fibrillation Tool </h1>
            <div>
               <h2>Select clinical system and import CSV file </h2>
            </div>
         </div> */}
         <div  className = "w-[50vw] mt-[25vh] ">

            <header className="mb-4">
               <img 
                  src={CegLogo} 
                  alt="Ceg Logo" 
                  className="w-[20%] mx-auto "
               />
               <h1 className="text-2xl text-center mt-4 font-bold">Atrial Fibrillation Tool </h1>
            </header>
               {/* <CardTitle>Card Title</CardTitle> */}
               
               
            
            
            {/* <CardContent className ="text-center"> */}
               
               <div>

               </div>
               <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl mb-2">Select clinical system and import CSV file </h2>
                  {/* <RadioGroup className ="flex justify-center items-center"> */}
                     <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                           <input
                              type="radio"
                              id="option-one"
                              name="gp-system"
                              value={GpInformationSystems.EMIS_Web}
                              onClick={handleGpSystemSelect}
                              className="w-4 h-4 border-2 rounded-full  checked:bg-[#648DBC] mr-2"
                           />
                           <label className="text-lg" htmlFor="option-one">EMIS Web</label>
                        </div>
                        <div className="flex items-center">
                           <input
                              type="radio"
                              id="option-two"
                              name="gp-system"
                              value={GpInformationSystems.EMIS_Web}
                              onClick={handleGpSystemSelect}
                              className="w-4 h-4 border-2 rounded-full  checked:bg-[#648DBC] mr-2"
                           />
                           <label className="text-lg" htmlFor="option-two ">SystmOne</label>
                        </div>
                        

                        {/* <RadioGroupItem 
                           value={GpInformationSystems.EMIS_Web} 
                           id="option-one" 
                           onClick ={handleGpSystemSelect}
                           className="w-5 h-5 border-2 rounded-full checked:bg-[#648DBC]" 
                           
                        />
                        <label htmlFor="option-one">EMIS Web</label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                           value={GpInformationSystems.SystmOne} 
                           id="option-two" 
                           onClick ={handleGpSystemSelect}
                        />
                        <label htmlFor="option-two">SystmOne</label>
                     </div>
                  </RadioGroup> */}
               </div>
            </div>
            {/* </CardContent> */}

            <div className="flex justify-center mt-2">
               {/* <Link to="/display"> */}
                  <Button className="text-center bg-[#648DBC] w-[6em] text-lg" onClick={handleButtonClick}>Import</Button>
               {/* </Link> */}
               
               <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style ={{display: 'none'}}
               />
            </div>
         </div>
      </div>
     

   </>
      
  )
}

export default Import
    
      