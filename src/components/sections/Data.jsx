import React, { useContext, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { MainContext } from '@/MainContext'
import { AFibColumns } from '@/enums/AFibColumns'
import { useReactTable } from '@tanstack/react-table'



const Data = () => {

   const { 
      getFilteredPatients, 
      setIsModalOpen, 
      handlePatientClick,
      handleSortClick,
      data, sortChdValue
      } = useContext(MainContext)

   // const filteredPatients = getFilteredPatients()
//    const [sortChdValue, setSortChdValue] = useState("asc")
  

//    // console.log(filteredPatients)
//    const handleSortClick = () => {
//       setSortChdValue (prevDirection => {
//          return (prevDirection === "asc" ? "desc" : "asc")
//       })
//    }

//    const sortedPatients = () => {
//       if (sortChdValue === 'asc') {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueA - valueB; // Ascending
//           });
//       } else {
//           return [...filteredPatients].sort((a, b) => {
//               const valueA = parseFloat(a[AFibColumns.CHADSVAScValue]) || 0;
//               const valueB = parseFloat(b[AFibColumns.CHADSVAScValue]) || 0;
//               return valueB - valueA; // Descending
//           });
//       }
//   };

//    const tableData = sortedPatients()


  return (
   <>      
       <Table className=" border border-gray-400 mb-10">
         
          <TableHeader>
             <TableRow className="font-bold text-xs">
                <TableHead className="border-b border-r border-gray-400 text-center font-bold ">Full Name</TableHead>
                <TableHead className="border-b border-r border-gray-400  font-bold ">Age</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold">Gender</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold ">Patience Reference No.</TableHead>
                <TableHead className="border-b border-r border-gray-400 w-44 p-0">
                   <tr className="border-none">
                      <th className="w-44 p-0">
                         <div className="h-full flex flex-col justify-center">
                            <div className="h-full w-full border-b border-gray-400 flex justify-center items-center py-1">
                            CHA₂DS₂-VASc
                            </div>
                           <div className="flex w-full">
                              <span className="w-full py-2 border-r border-gray-400 cursor-pointer" onClick={handleSortClick}
                              >
                                 Value<span>{sortChdValue === "asc" ? ' ↑' : ' ↓'}</span>
                              </span>
                           
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
                <TableHead className="border-b border-r border-gray-400 font-bold  ">Anticoagulant issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold ">Aspirin / Antiplatelet <br />issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold ">NSAID issued excl. <br /> Aspirin(6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold ">Statin issued (6m)</TableHead>
                <TableHead className="border-b border-r border-gray-400 font-bold">CVD</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold">HTN</TableHead>
               <TableHead className="border-b border-r border-gray-400 font-bold">BP</TableHead>
                <TableHead className="border-b border-gray-400 font-bold ">Medication Review Latest date</TableHead>
             </TableRow>
          </TableHeader>
         
          
         <TableBody className="text-center text-xs">
             {data.map((patient, index)=> (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''} >
               {/* <Dialog>
                  <DialogTrigger asChild> */}
                     <TableCell className="font-medium  cursor-pointer text-blue-600 hover:underline"
                        onClick={()=>handlePatientClick(index)}
                     >
                        {patient[AFibColumns.FullName]}

                     </TableCell>
                 

               
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
               <TableCell>{patient[AFibColumns.OnAnticoagulant]}</TableCell>
               <TableCell >{patient[AFibColumns.OnAspirinAntiplatelet]}</TableCell>
               <TableCell >{patient[AFibColumns.OnNSAID]}</TableCell>
               <TableCell>{patient[AFibColumns.OnStatin]}</TableCell>
               <TableCell >{patient[AFibColumns.CVD]}</TableCell>
               <TableCell >{patient[AFibColumns.Hypertension]}</TableCell>
               <TableCell >{patient[AFibColumns.BP]}</TableCell>
               <TableCell >{patient[AFibColumns.MedsReviewDate]}</TableCell>
            </TableRow>
              )) }
         </TableBody>
      </Table>
     {/* </div> */}
    </>

   
  )
}

export default Data
