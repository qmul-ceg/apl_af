import React, { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '@/MainContext'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { AFibColumns } from '@/enums/AFibColumns'


const Modal = ({open, }) => {

   // const { setOpenModal, modalOpen } = useContext(MainContext)
   const { setIsModalOpen, modalOpen, selectedPatientData, handleNextPatient, handlePreviousPatient } = useContext(MainContext)

   
   if (!open) return null
   

   const OVERLAY ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0, 0.7)',
      zIndex:50
   }
   return (
      <>
      <div className="fixed" style={OVERLAY} />
         {/* {selectedPatientData.map((patient, index) => ( */}
         <div className="fixed inset-0 border w-[70%] m-auto z-50 bg-white text-xs">
            <div className="border flex flex-row justify-between items-center">
               Patient Modal 
               <button className="border rounded-sm p-1" onClick={()=>setIsModalOpen(false)}> 
                  close 
               </button>
            </div>

            
            {/* {selectedPatientData.map((patient, index) => ( */}
              
            <div className="border text-xs">
               <div className="flex justify-between">
                  <div className="border w-[40%]">
                     <div className="flex">
                        <h2>Full Name</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.FullName]}</div>
                     </div>
                     <div className="flex text-xs">
                        <h2>Date of Birth</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.DateOfBirth]}</div>
                     </div>
                     <div className="flex">
                        <h2>NHS Number</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.NHS_Number]}</div>
                     </div>
                     <div className="flex">
                        <h2>Ethnicity</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.EthnicityCodeTerm]}</div>
                     </div>
                  </div>
                  <div className="border w-[50%]">
                     <div className="flex">
                        <h2>Patient record #</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.PatientReference]}</div>
                     </div>
                     <div className="flex">
                        <h2>Gender</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.Gender]}</div>
                     </div>
                     <div className="flex">
                        <h2>Age</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.Age]}</div>
                     </div>
                     <div className="flex">
                        <h2>Mobile Telephone</h2>
                        <div className="border w-[60%]">{selectedPatientData[AFibColumns.MobileTelephone]}</div>
                     </div>
                  </div>
               </div>

               <div className="border flex justify-center p-2 gap-6">
                  <button className="border border-black p-2" onClick={handleNextPatient}>Next patient</button>
                  <button className="border border-black p-2" onClick={handlePreviousPatient}>Previous patient</button>
               </div>
               
               <div className="border h-[86vh] overflow-y-auto pb-10">
               {/* MEDICATIONS TABLE */}
                  <Table>
                     
                     <TableHeader>
                        <TableRow>
                           <TableHead >Medications</TableHead>
                           <TableHead>Medication name</TableHead>
                           <TableHead>Date of Issue</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >Warfarin(6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.WarfarinMed]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.WarfarinDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >DOAC(6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.DOAC_Med]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.DOAC_Date]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Third Party Prescribing(12m)</TableCell>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Other Oral Anticoagulants(12m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.OtherAnticoagulantsMed]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.OtherAnticoagulantsDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Aspirin(6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AspirinMed]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AspirinDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Other antiplatelets (12m)</TableCell>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >PPI medication (6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.PPI_Med]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.PPI_Date]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >NSAID (excludng Aspirin)(6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.NSAID_Med]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.NSAID_Date]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Statins(6m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.StatinsMed]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.StatinsDate]}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>

                  {/* RISK SCORE TABLE */}
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead >Risk Score</TableHead>
                           <TableHead>Score</TableHead>
                           <TableHead>Date Recorded</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >CHA₂DS₂-VASc (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.CHADSVAScValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.CHADSVAScDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >ORBIT (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.ORBIT_Value]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.ORBIT_Date]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >HAS-BLED (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.HASBLED_Value]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.HASBLED_Date]}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>

                  {/* COMORBIDITIES TABLE */}
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead >Comorbidities</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead>Date Recorded</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)</TableCell>
                           <TableCell>{`${selectedPatientData[AFibColumns.StrokeTIA_Concept]},${selectedPatientData[AFibColumns.NonHaemStrokeConcept]}`}``</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Liver Failure</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.LiverFailureConcept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Heart Valve</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.HeartValveConcept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Bleeding History</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.BleedConcept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >SMI/Learning Disability/Housebound</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.SMI_Concept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow><TableRow>
                           <TableCell >Dementia</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.DementiaConcept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow><TableRow>
                           <TableCell >Palliative Care</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.PalliativeCareConcept]}</TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>

                  {/* PROCESS MEASURES TABLE */}
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead >Process Measures</TableHead>
                           <TableHead>Value</TableHead>
                           <TableHead>Date Recorded</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >International normalised ratio (INR) (latest in 24m)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.INR_Value]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.INR_Date]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>INR values may not be recorded in the GP system and may be under required in this tool.</TableCell>
                           
                        </TableRow>
                        <TableRow>
                           <TableCell >Systolic/Diastolic BP (mmHg) (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.SystolicBPValue]}, {selectedPatientData[AFibColumns.DiastolicBPValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.SystolicBPDate]},{selectedPatientData[AFibColumns.DiastolicBPValue]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Alcohol consumption </TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AlcoholValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AlcoholDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Audit Scores * (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AuditScoresValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AuditScoresDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Cockcroft-Gault CrCI (mL/min)(latest ever)</TableCell>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Serum Creatinine Level (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.SerumCreatValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.SerumCreatDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Serium ALT or ASP (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.ALT_LFT_Value]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.ALT_LFT_Date]}</TableCell>
                        </TableRow><TableRow>
                           <TableCell >Haemoglobin (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.HaemEstimateValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.HaemEstimateDate]}</TableCell>
                        </TableRow><TableRow>
                           <TableCell >Weight (kg)(latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.WeightValue]}</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.WeightDate]}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>

                  {/* MEDICATION REVIEW TABLE */}
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead >Medication Review</TableHead>

                           <TableHead>Date Recorded</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >Medication Reviewed (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.MedsReviewDate]}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>

                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead >Exception Reporting</TableHead>
                           <TableHead>Date Recorded</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell >Anticoagulants contraindicated (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AnticoagContraDate]}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell >Anticoagulants declined (latest ever)</TableCell>
                           <TableCell>{selectedPatientData[AFibColumns.AnticoagDeclineDate]}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
                  <div className="flex flex-col pt-4">
                     <textarea placeholder='Enter patient notes here' className="border w-full">

                     </textarea>
                     <button className="border w-10">
                        Save
                     </button>

                  </div>
               </div>
               
               
            </div>
          {/* ))}  */}

      
         </div>
      </>
   )
}

export default Modal


// import React, { useState } from 'react'

// const Modal = ({isOpen, onClose, content}) => {
//    if(!isOpen) return null;

//   return (
//     <>
//          <div className="flex flex-col justify-between w-[90vw]">  
//             <header className=" flex px-2 py-2 rounded-t-lg bg-[#648DBC] text-white justify-between">
//                <strong>PATIENT INFORMATION</strong>
//                <button onClick={onClose} > <strong></strong>x </button>
//             </header>
//             <div>
//                {/* content */}
//             </div>
//          </div>
//     </>
//   )
// }

// export default Modal



  // useEffect(() =>{
   //    if(open){
   //       document.body.classList.add("overflow-hidden");
   //    }else{
   //       document.body.classList.remove("overflow-hidden")
   //    }
   //    //Cleanup function when modal is
   //    return()=>{
   //       document.body.classList.remove("overflow-hidden")
   //    }
   // }, [open])