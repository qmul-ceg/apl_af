import React, { useEffect } from 'react'
import { useContext } from 'react'
import { MainContext } from '@/MainContext'
import {Table, TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { AFibColumns } from '@/enums/AFibColumns'
import { Description } from '@radix-ui/react-dialog'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const Modal = ({open, }) => {

   // const { setOpenModal, modalOpen } = useContext(MainContext)
   const { setIsModalOpen, 
      selectedPatientData, 
      handleNextPatient, 
      handlePreviousPatient, 
      isModalOpen,
      } = useContext(MainContext)


   if (!open) return null

   // STOPS BACKGROUND FROM SCROLLING
//    useEffect(() => {
//       if (open) {
//           document.body.classList.add('no-scroll');
//       } else {
//           document.body.classList.remove('no-scroll');
//       }
  
//       // Clean up effect
//       // return () => {
//       //     document.body.classList.remove('no-scroll');
//       // };
//   }, [open]);
   

   const OVERLAY ={
      position : 'fixed',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0, 0.7)',
      zIndex:50
   }

   const medicationTableData = [
      {  medication: "Warfarin (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.WarfarinMed], 
         dateOfIssue: selectedPatientData[AFibColumns.WarfarinDate] 
      },
      {
         medication: "DOAC (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.DOAC_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.DOAC_Date] 
      },
      {
         medication: "Third Party Prescribing (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.ThirdPartyCodeTerm], 
         dateOfIssue: selectedPatientData[AFibColumns.ThirdPartyCodeDate] 
      },
      {
         medication: "Other Oral Anticoagulants (12m", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.OtherAnticoagulantsMed], 
         dateOfIssue: selectedPatientData[AFibColumns.OtherAnticoagulantsDate] 
      },
      {
         medication: "Aspirin (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.AspirinMed], 
         dateOfIssue: selectedPatientData[AFibColumns.AspirinDate] 
      },
      {
         medication: "Other Antiplatelets (12m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.AntiplateletMed], 
         dateOfIssue: selectedPatientData[AFibColumns.AntiplateletDate] 
      },
      {
         medication: "PPI medication (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.PPI_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.PPI_Date] 
      },
      {
         medication: "NSAID (excluding Aspirin)(6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.NSAID_Med], 
         dateOfIssue: selectedPatientData[AFibColumns.NSAID_Date] 
      },
      {
         medication: "Statins (6m)", 
         colorCode: "", 
         medicationName: selectedPatientData[AFibColumns.StatinsMed], 
         dateOfIssue: selectedPatientData[AFibColumns.StatinsDate] 
      }
   ]

   const riskScoreTableData = [
      {
         risk: "CHA₂DS₂-VASc (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.CHADSVAScValue], 
         dateRecorded: selectedPatientData[AFibColumns.CHADSVAScDate] 
      },
      {
         risk: "ORBIT (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.ORBIT_Value], 
         dateRecorded: selectedPatientData[AFibColumns.ORBIT_Date] 
      },
      {
         risk: "HAS-BLED (latest ever)", 
         colorCode: "", 
         score: selectedPatientData[AFibColumns.HASBLED_Value], 
         dateRecorded: selectedPatientData[AFibColumns.HASBLED_Date] 
      },
   ]

   const comorbiditiesTableData = [
      {
         comorbidity: "HF, CKD 3-5, IHD, Stroke/TIA, PAD, HTN, Diab (T1/T2)", 
         colorCode: "", 
         description:"" , 
         dateRecorded: ""
      },
      {
         comorbidity: "Liver Failure", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.LiverFailureConcept]
      },
      {
         comorbidity: "Heart Valve", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.HeartValveConcept]
      },
      {
         comorbidity: "Bleeding history", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.BleedConcept]
      },
      {
         comorbidity: "SMI/Learning Disability/Housebound", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.SMI_Concept]
      },
      {
         comorbidity: "Dementia", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.DementiaConcept]
      },
      {
         comorbidity: "Palliative Care", 
         colorCode: "", 
         description: "", 
         dateRecorded: selectedPatientData[AFibColumns.PalliativeCareConcept]
      },
   
   ]

   const processMeasuresTableData = [
      {
         process: "International normalised ratio (INR)(latest in 24m)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.INR_Value], 
         dateRecorded: selectedPatientData[AFibColumns.INR_Date] 
      },
      {
         process: "Systolic/Diastolic BP (mmHg)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.SystolicBPConcept], 
         dateRecorded: selectedPatientData[AFibColumns.SystolicBPDate] 
      },
      {
         process: "Alcohol consumption", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.AlcoholValue], 
         dateRecorded: selectedPatientData[AFibColumns.AlcoholDate] 
      },
      {
         process: "Audit Scores * (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.AuditScoresConcept], 
         dateRecorded: selectedPatientData[AFibColumns.AuditScoresDate] 
      },
      {
         process: "Cockcroft-Gault CrCI (mL/min)(latest ever)", 
         colorCode: "", 
         value: "", 
         dateRecorded: ""
      },
      {
         process: "Serum Creatinine Level (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.SerumCreatValue], 
         dateRecorded: selectedPatientData[AFibColumns.SerumCreatDate]
      },
      {
         process: "Serum ALT or ASP(latest ever", 
         colorCode: "", 
         value: "", 
         dateRecorded: ""
      },
      {
         process: "Haemoglobin (latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.HaemEstimateValue], 
         dateRecorded: selectedPatientData[AFibColumns.HaemEstimateDate]
      },
      {
         process: "Weight (kg)(latest ever)", 
         colorCode: "", 
         value: selectedPatientData[AFibColumns.WeightValue], 
         dateRecorded: selectedPatientData[AFibColumns.WeightDate]
      },
      
   ]


   return (
      <>
      <div className="fixed "  style={OVERLAY} />
         
         
         
         <div className="fixed inset-0 max-h-[80vh] w-[60%] max-w-[900px] m-auto z-50  ">
            {/* HEADER */}
            <div className="flex justify-between items-center  w-full h-12 px-4 rounded-t-lg bg-[#648DBC] text-white">
               <strong>Patient Information Modal </strong>
            <button className="  p-1 text-2xl" onClick={()=>{
               console.log('Closing Modal...')
               setIsModalOpen((prevState) => !prevState)
               }}> 
                  x 
               </button>
            </div>

            
           
              
            <div className="border text-xs px-2 flex flex-col h-[90%] bg-white">
               <div className="flex w-full  border-black border-dotted mt-2">

                  {/* TABLE 1 */}
                  <div className="flex flex-col gap-2  w-[50%] text-left">
                     <div className="flex ">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Full Name</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.FullName]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Date of Birth</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.DateOfBirth]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">NHS Number</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.NHS_Number]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Ethnicity</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.EthnicityCodeTerm]}</div>
                     </div>
                  </div>

                  {/* TABLE 2 */}
                  <div className="flex flex-col gap-2 w-[50%] text-left">
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Patient record #</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.PatientReference]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Gender</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.Gender]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Age</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.Age]}</div>
                     </div>
                     <div className="flex">
                        <h2 className=" w-[30%] text-white pl-2 bg-[#648DBC] font-semibold py-1">Mobile Telephone</h2>
                        <div className="border-b border-gray-400 w-[65%]  pl-2 py-1">{selectedPatientData[AFibColumns.MobileTelephone]}</div>
                     </div>
                  </div>
               </div>

               <div className=" flex justify-center p-2 gap-6 mt-4 mb-4">
                  <button className="border border-black p-2" onClick={handleNextPatient}>Next patient</button>
                  <button className="border border-black p-2" onClick={handlePreviousPatient}>Previous patient</button>
               </div>
               
               
               {/* TABLES */}
               <div className=" flex-1 overflow-y-auto max-h-full ">
                  {/* MEDICATIONS TABLE */}
                  <table className="w-full border">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Medications</th>
                           <th className=" w-[10%]" colSpan="1">&nbsp;</th>
                           <th className=" border-black pl-2">Medication Name</th>
                           <th className=" border-black pl-2  w-[15%]">Date of Issue</th>

                        </tr>
                     </thead>
                     <tbody>
                        {
                           medicationTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }>
                                 <td className="py-1 pl-4 font-semibold">{item.medication}</td>
                                 <td></td>
                                 <td className="py-1 pl-4">{item.medicationName}</td>
                                 <td className="py-1 pl-4">{item.dateOfIssue}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  {/* RISK SCORE TABLE */}
                  <table className="w-full border mt-4">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Risk Score</th>
                           <th className="w-[10%]" colSpan="1">&nbsp;</th>
                           <th className=" pl-2">Score</th>
                           <th className=" pl-2 w-[15%]">Date Recorded</th>

                        </tr>
                     </thead>
                     <tbody>
                        {
                           riskScoreTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }  
                                 
                              >
                                 <td className="py-1 pl-4 font-semibold">{item.risk}
                                 {item.process}
                                    {item.risk === "CHA₂DS₂-VASc (latest ever)" && (
                                       
                                       <span><Popover >
                                          <PopoverTrigger className="pl-2">
         
                                          <strong className="text-sm">i</strong>
                                          
                                       </PopoverTrigger>
                                       <PopoverContent className="p-0 w-[30em] h-[8em] text-sm">
                                          <table className="border w-full">
                                             <thead className="border bg-gray-100 w-full">
                                                <tr className="py-2">
                                                   <th className="py-1 w-full">CHA₂DS₂-VASc Risk Factors</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                <thead>
                                                   <tr className="flex w-full border">
                                                      <th className="border text-left pl-2">Risk Factors</th>
                                                      <th className="pl-2 border">Points</th>
                                                   </tr>
                                                </thead>
                                                <tr>
                                                   <td className="border w-[22em]">Congestive Heart Failure (CHF)</td>
                                                   <td className ="border-b border-gray-100 py-1 pl-2 text-center">?</td>
                                                </tr>
                                                <tr>
                                                   <td className ="border-b border-gray-100 py-1 pl-2">AUDIT-C {">"} 5: High or severe drinking risk</td>
                                                
                                                </tr>
                                             </tbody>

                                          </table>
                                       </PopoverContent>
                                    </Popover></span>
                                    )}


                                 </td>
                                 <td></td>
                                 <td className="py-1 pl-4">{item.score}</td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  
                  {/* COMORBODITIES TABLE  */}
                  <table className="w-full border mt-4">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Comorboditiies</th>
                           <th className="w-[10%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4">Description</th>
                           <th className=" pl-2 w-[15%]">Date Recorded</th>

                        </tr>
                     </thead>
                     <tbody>
                        {
                           comorbiditiesTableData.map((item, index) =>(
                              <tr key={index} 
                                 className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" } 
                              >
                                 <td className="py-1 pl-4 font-semibold">{item.comorbidity}
                                    
                                 </td>
                                 <td></td>
                                 <td className="py-1 pl-4">{item.description}</td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>

                  {/* PROCESS MEASURES */}
                  <table className="w-full border mt-4">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Process Measures</th>
                           <th className="w-[10%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4">Value</th>
                           <th className=" pl-2 w-[15%]">Date Recorded</th>

                        </tr>
                     </thead>
                     <tbody>
                        {
                           processMeasuresTableData.map((item, index) =>(
                              <tr key={index} 
                              className ={
                                 index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b" }    
                              >
                                 <td className="py-1 pl-4 font-semibold">{item.process}
                                    {item.process === "Audit Scores * (latest ever)" && (
                                       
                                       <span><Popover >
                                          <PopoverTrigger className="pl-2">
         
                                          <strong className="text-sm">i</strong>
                                          
                                       </PopoverTrigger>
                                       <PopoverContent className="p-0 w-[25em] h-[8em] text-sm">
                                          <table className="border w-full ">
                                             <thead className="border bg-gray-100">
                                                <tr className="py-2">
                                                   <th className="py-1">AUDIT SCORES *</th>
                                                </tr>
                                             </thead>
                                             <tbody >
                                                <tr>
                                                   <td className ="border-b border-gray-100 py-1 pl-2">AUDIT {">"} 15: High or severe drinking risk</td>
                                                
                                                </tr>
                                                <tr>
                                                   <td className ="border-b border-gray-100 py-1 pl-2">AUDIT-C {">"} 5: High or severe drinking risk</td>
                                                
                                                </tr>
                                             </tbody>

                                          </table>
                                       </PopoverContent>
                                    </Popover></span>
                                    )}


                                 </td>
                                 <td></td>
                                 <td className="py-1 pl-4">{item.description}</td>
                                 <td className="py-1 pl-4">{item.dateRecorded}</td>
                              </tr>
                           ) )
                        }
                     </tbody>
                  </table>
                  {/* MEDICATION REVIEW */}
                  <table className="w-full border mt-4">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Medication Review</th>
                           <th className="w-[10%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4"></th>
                           <th className=" pl-2 w-[15%]">Date Recorded</th>

                        </tr>
                     </thead>
                     <tbody>
                           <tr className="bg-gray-100 border-b">
                              <td className="py-1 pl-4 font-semibold ">Medication Reviews (latest ever)</td>
                              <td></td>
                              <td></td>
                              <td className="py-1 pl-4">{selectedPatientData[AFibColumns.MedsReviewDate]}</td>
                           </tr>
                          
                     </tbody>
                  </table>

                   {/* EXCEPTION REPORTING */}
                   <table className="w-full border mt-4">
                     <thead className="bg-[#648DBC] text-left text-white font-semibold">
                        <tr>
                           <th className=" pl-2 py-1 w-[40%]">Exception Reporting</th>
                           <th className="w-[10%]" colSpan="1">&nbsp;</th>
                           <th className="py-1 pl-4"></th>
                           <th className=" pl-2 w-[15%]">Date Recorded</th>

                        </tr>
                     </thead>
                     <tbody>
                        <tr className="bg-gray-100 border-b">
                           <td className="py-1 pl-4 font-semibold ">Anticoagulants contraindicated (latest ever)</td>
                           <td></td>
                           <td></td>
                           <td className="py-1 pl-4">{selectedPatientData[AFibColumns.AnticoagContraDate]}</td>
                        </tr>
                        <tr>
                           <td className="py-1 pl-4 font-semibold ">Anticoagulants declined (latest ever)</td>
                           <td></td>
                           <td></td>
                           <td className="py-1 pl-4">{selectedPatientData[AFibColumns.AnticoagDeclineDate]}</td>
                        </tr>
                          
                     </tbody>
                  </table>
                  
                  <div className="flex flex-col mt-6 mb-10">
                     <textarea placeholder='Enter patient notes here' className="border w-full h-20 text-sm p-2">

                     </textarea>
                     <button className = "bg-[#648DBC] font-semibold text-white w-20 px-2 py-2 rounded-md mt-2 ml-auto" >
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


