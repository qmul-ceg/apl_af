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
import { onAnticoagulantMeds, onAspirinAntiplateletMeds, onNSAIDMeds } from './helper/AFibLTCmeds'


const Import = () => {
   
   const [gpSystemSelected, setGpSystemSelected] = useState(GpSystems.NoneSelected)
   // console.log(gpSystemSelected)
   
   const { setImportedData } = useContext(MainContext)

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
                     relativeRunDate = line[3]
                  }
                  if(line[0].includes("Patient Details")){
                     skipRows++;
                     break;
                  }
                  skipRows++;
               }
               parseData(file, skipRows) //?? HOISTING Function
               
               // window.location.href='/display'
             
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
      <div className = "flex justify-center  items-start h-screen border border-dotted">
         <Card  className = " w-[500px] mt-[25vh]">
            <CardHeader className="text-center">
               {/* <CardTitle >Card Title</CardTitle> */}
               <img 
                  src={CegLogo} 
                  alt="Ceg Logo" 
                  className="w-[100px] mx-auto"
               />
               <CardDescription >Atrial Fibrillation Tool </CardDescription>
            </CardHeader>

            <CardContent className ="text-center">
               <p>Select clinical system and import CSV file </p>
               <div>
                  <RadioGroup className ="flex justify-center items-center">
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value={GpInformationSystems.EMIS_Web} id="option-one" 
                        onClick ={handleGpSystemSelect}/>
                        <label htmlFor="option-one">EMIS Web</label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value={GpInformationSystems.SystmOne} id="option-two" 
                        onClick ={handleGpSystemSelect}/>
                        <label htmlFor="option-two">SystmOne</label>
                     </div>
                  </RadioGroup>
               </div>
            </CardContent>

            <div className="flex justify-center mt-4">
               {/* <Link to="/display"> */}
                  <Button className="text-center" onClick={handleButtonClick}>Import</Button>
               {/* </Link> */}
               
               <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style ={{display: 'none'}}
               />
            </div>
         </Card>
      </div>
     

   </>
      
  )
}

export default Import
    
      // const file = event.target.files[0]
      // if(!file) return;

      // if(file.type !== 'text/csv'){
      //    setDefaultResultOrder('Please upload a valid CSV file.')
      //    return;
      // }

      // Papa.parse(file, {
      //    // header: true, 
      //    // skipEmptyLines: true,
      //    complete: (result) => {
      //       console.log(result)
      //    }
      // })