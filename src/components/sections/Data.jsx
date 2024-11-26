import React, { useContext } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
// import patients from '/src/data/patient_data.json'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { MainContext } from '@/MainContext'
import { AFibColumns } from '@/enums/AFibColumns'


const Data = () => {

   const { getFilteredPatients } = useContext(MainContext)

   const filteredPatients = getFilteredPatients()
   

  return (
    <>
      <Table className="border border-gray-400">
         {/* <TableCaption>Patient Data</TableCaption> */}
         <TableHeader>
            <TableRow className="font-bold">
               <TableHead className="border-b border-r  border-gray-400 text-center font-bold  w-36">Full Name</TableHead>
               <TableHead className="border-b border-r border-gray-400  font-bold w-2">Age</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-2">Gender</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-28">Patience Reference No.</TableHead>
               <TableHead className="border-b border-r  border-gray-400 w-44 p-0">
                  <tr className="border-none">
                     <th className="w-44 p-0">
                        <div className="h-full flex flex-col justify-center">
                           <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1">
                           CHA₂DS₂-VASc
                           </div>
                        <div className="flex w-full">
                           <span className="w-full py-2 border-r border-gray-400">Value</span>
                          
                           <span className="w-full py-2  border-gray-400">Latest Date</span>
                        </div>
                        </div>
                     </th>
                  </tr>
               </TableHead>
               <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                  <tr className="border-none">
                     <th className="w-44 p-0">
                        <div className="h-full text-center flex flex-col justify-center">
                           <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1">
                              ORBIT
                           </div>
                        <div className="flex w-full">
                           <span className="w-full py-2 border-r border-gray-400">Value</span>
                          
                           <span className="w-full py-2  border-gray-400">Latest Date</span>
                        </div>
                        </div>
                     </th>
                  </tr>
               </TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-28 ">Anticoagulant issued (6m)</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-40 ">Aspirin / Antiplatelet <br />issued (6m)</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-36">NSAID issued excl. <br /> Aspirin(6m)</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold w-28">Statin issued (6m)</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold">CVD</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold">HTN</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold">BP</TableHead>
               <TableHead className="border-b border-gray-400 font-bold w-40">Medication Review Latest date</TableHead>
            </TableRow>
         </TableHeader>
         
         <TableBody className="text-center">
            {filteredPatients.map((patient, index)=> (
            <TableRow key={index}>
               <Dialog>
                  <DialogTrigger asChild>
                     <TableCell className="font-medium  cursor-pointer text-blue-600 hover:underline">
                        {patient[AFibColumns.FullName]}

                     </TableCell>
                  </DialogTrigger>
                  <DialogContent className="w-full">
                     <DialogHeader>
                        <DialogTitle>Patient Details</DialogTitle>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>

               
               <TableCell>{patient[AFibColumns.Age]}</TableCell>
               <TableCell>{patient[AFibColumns.Gender]}</TableCell>
               <TableCell >{patient[AFibColumns.PatientReference]}</TableCell>
               <TableCell>
               <div className="flex w-full">
                  <span className="text-xs w-[50%] border">{patient[AFibColumns.CHADSVAScValue]}</span>
                  <span className="text-xs w-full border">{patient[AFibColumns.CHADSVAScDate]}</span>
               </div>
               </TableCell>
               
               <TableCell >
                  <div className="flex w-full">
                     <span className="text-xs w-[50%] border ">{patient[AFibColumns.ORBIT_Value]}</span>
                     <span className="text-xs w-full border ">{patient[AFibColumns.ORBIT_Date]}</span>
                  </div>
               </TableCell>
               <TableCell>{patient[AFibColumns.OnAspirinAntiplatelet]}</TableCell>
               <TableCell >{patient[AFibColumns.OnAspirinAntiplatelet]}</TableCell>
               <TableCell >{patient[AFibColumns.OnNSAID]}</TableCell>
               <TableCell>{patient[AFibColumns.OnStatin]}</TableCell>
               <TableCell >{patient[AFibColumns.CVD]}</TableCell>
               <TableCell >{patient[AFibColumns.Hypertension]}</TableCell>
               <TableCell >{patient[AFibColumns.SystolicBPValue]}</TableCell>
               <TableCell >{patient[AFibColumns.MedsReviewDate]}</TableCell>

            </TableRow>
              )) }
         </TableBody>
      </Table>
    </>
  )
}

export default Data
