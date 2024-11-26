import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from './components/ui/card'
import CegLogo from './assets/images/ceg_logo.png'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group.jsx'
import { Button, buttonVariants } from './components/ui/button.jsx'
import {Link} from'react-router-dom'
import Papa from 'papaparse'
import { GpSystems } from './enums/GPsystems.ts'


const Import = () => {

   GpSystems.EMIS_Web
   
   // FILE INPUT FUNCTIONALITY
   const fileInputRef = useRef(null)

   const handleButtonClick = () =>{
      if(fileInputRef.current) {
         fileInputRef.current.click()
      }
   }

   const handleFileUpload = (event =>{
      const file = event.target.files[0]
      if(!file) return;

      if(file.type !== 'text/csv'){
         setDefaultResultOrder('Please upload a valid CSV file.')
         return;
      }

      Papa.parse(file, {
         // header: true, 
         // skipEmptyLines: true,
         complete: (result) => {
            console.log(result)
         }
      })


   })

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
                        <RadioGroupItem value="option-one" id="option-one" />
                        <label htmlFor="option-one">EMIS Web</label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
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
