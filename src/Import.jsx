import React, { useContext, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from './components/ui/card'
import CegLogo from './assets/images/ceg_logo.png'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group.jsx'
import { Button, buttonVariants } from './components/ui/button.jsx'
import {Link, useNavigate} from'react-router-dom'
import Papa from 'papaparse'
import { GpSystems } from './enums/GPsystems.ts'
import { MainContext } from './MainContext'
//import { GpInformationSystems } from './enums/GpInformationSystems'
import { AFibColumns } from './enums/AFibColumns'
import { getBloodPressure, hasCVD, hasHypertension, onAnticoagulantMeds, onAspirinAntiplateletMeds, onNSAIDMeds, onStatinsMeds } from './helper/AFibLTCmeds'
import { transformS1ImportedData } from './helper/S1DataTransform'

const Import = () => {
   

   const navigate = useNavigate()//Inititalised the navigate function
   const [gpSystemSelected, setGpSystemSelected] = useState(GpSystems.NotSelected)
 
   //Imports from our main context
   const { setImportedData, setRelativeRunDate } = useContext(MainContext)

   //Sets GPsystem 
   const handleGpSystemSelect = (event) =>{
      setGpSystemSelected(event.target.value)
   }

   // Report columns
   const EMIS_ReportColumnsCount = 91;
   const S1ReportColumnsCount = 85;
   
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
      
      const reader = new FileReader();

      //Check GP system 
      if(gpSystemSelected === GpSystems.EMIS_Web){         
 
         reader.readAsText(file);

         reader.onload = function() {
            let lines = reader.result.split('\n');
            
            for (let i = 0; i < lines.length; i++){
               let line = lines[i].split(',');
               if(line[0].includes("Last Run") || line[0].includes("Last run")){
                  runDateTime = line[3]
               }
               if(line[0].includes("Patient Details") || line[0].toLowerCase().includes("patient details")){
                  skipRows++;

                  if (line.length !== EMIS_ReportColumnsCount) {
                     alert("EMIS Web report is not valid, please import correct report version.");
                     throw "EMIS Web report is not valid";
                  }                     
                  break;
               }
               skipRows++;
            }
            if (runDateTime) {                  
               relativeRunDate = runDateTime.split(' ')[0] // Splits the run date and time and saves the first value in the variable
               setRelativeRunDate(relativeRunDate)
               parseData(file, skipRows) //?? HOISTING Function
            }
            else {
               alert("EMIS Web report is not valid, please import correct report version.");
               throw "EMIS Web report is not valid";
            }
         };         
      }
      else if (gpSystemSelected === GpSystems.SystmOne) {
         
         relativeRunDate = '1-Apr-2024';  //file.lastModified;
         setRelativeRunDate(relativeRunDate);

         reader.readAsText(file);

         reader.onload = function() {
            let lines = reader.result.split('\n');
            let line = lines[0].split(',');

            if (line.length !== S1ReportColumnsCount) {
               alert("S1 report is not valid, please import correct report version.");
               throw "S1 report is not valid";
            }
            parseData(file, skipRows);
         }
         
      }      
   }

   function parseData(file, skipLines) {
      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          skipFirstNLines: skipLines,
          complete: function (result) {

              let dataArray = [];

              if (gpSystemSelected === GpSystems.EMIS_Web) {

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
              }
              else if (gpSystemSelected === GpSystems.SystmOne) {

                  const rundate = '1-Apr-2024'; //relativeRunDate = '22-Feb-2024';  //file.lastModified;

                  dataArray = transformS1ImportedData(result.data, rundate);

                  dataArray.forEach((dataRow, index) => {
                        dataArray[index][AFibColumns.OnAnticoagulant] = onAnticoagulantMeds(dataRow);
                        dataArray[index][AFibColumns.OnAspirinAntiplatelet] = onAspirinAntiplateletMeds(dataRow);
                        dataArray[index][AFibColumns.OnNSAID] = onNSAIDMeds(dataRow);
                        dataArray[index][AFibColumns.OnStatin] = onStatinsMeds(dataRow);
                        dataArray[index][AFibColumns.CVD] = hasCVD(dataRow);
                        dataArray[index][AFibColumns.Hypertension] = hasHypertension(dataRow);
                        dataArray[index][AFibColumns.BP] = getBloodPressure(dataRow);               
                  });
              }
              
              //console.log("Processed Data:", dataArray);
              setImportedData(dataArray)
              navigate("/display",);
              
              
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
                              value={GpSystems.EMIS_Web}
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
                              value={GpSystems.SystmOne}
                              onClick={handleGpSystemSelect}
                              className="w-4 h-4 border-2 rounded-full  checked:bg-[#648DBC] mr-2"
                           />
                           <label className="text-lg" htmlFor="option-two ">SystmOne</label>
                        </div>
                        

                   
               </div>
            </div>
         

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
    
      